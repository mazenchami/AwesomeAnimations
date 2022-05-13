import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Character } from "../../models/character/character"

export const useCharacterHelpers = () => {
  const initialModeRef = useRef<boolean>(true)
  const [characters, setCharacters] = useState<Character[]>([])
  const [deletedCharacters, setDeletedCharacters] = useState<Character[]>([])
  const onAdd = useCallback(() => {
    const pickedCharacter = deletedCharacters[0]
    if (pickedCharacter === undefined) {
      return
    }
    setDeletedCharacters((currentItems) => [...currentItems.slice(1)])
    setCharacters((currentItems) => [pickedCharacter, ...currentItems])
  }, [deletedCharacters])
  const onDelete = useCallback(
    (itemId: number) => {
      const deletedCharacter = characters.find((item) => item.id === itemId)
      if (deletedCharacter !== undefined) {
        setDeletedCharacters((currentItems) => {
          return [...currentItems, deletedCharacter]
        })
      }
      setCharacters((currentItems) => currentItems.filter((item) => item.id !== itemId))
    },
    [characters],
  )

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/infinitered/ignite/master/data/rick-and-morty.json")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results)
        initialModeRef.current = false
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return useMemo(
    () => ({
      characters,
      initialModeRef,
      onAdd,
      onDelete,
    }),
    [characters, initialModeRef],
  )
}
