import React, { useCallback, useEffect, useRef } from "react"
import { Animated, Dimensions, FlatList, StyleSheet, View } from "react-native"
import { Button } from "../../components"
import { Character } from "../../models/character/character"
import { color } from "../../theme"
import { DemoCharacter } from "./demo-character"
import { useCharacterHelpers } from "./useCharacterHelpers"

const { width } = Dimensions.get("window")

interface ItemProps {
  item: Character
  index: number
  onDelete: (id: number) => void
}

export const DemoRN: React.FC = () => {
  const { characters, onDelete, onAdd } = useCharacterHelpers()
  return (
    <View>
      <Button text="+" onPress={onAdd} />
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <Item item={item} index={index} onDelete={onDelete} />}
      />
    </View>
  )
}

const Item: React.FC<ItemProps> = ({ item, index, onDelete }) => {
  const translateXValue = useRef(new Animated.Value(width)).current // screen width, off screen
  const fadeAnimValue = useRef(new Animated.Value(1)).current // start width visible
  useEffect(() => {
    // animate in on mount from right
    Animated.timing(translateXValue, {
      toValue: 0,
      duration: 200 * index,
      useNativeDriver: true,
    }).start()
  }, [])
  const fadeOut = useCallback(
    (callback) => {
      // fade out and swipe out on click
      Animated.parallel([
        Animated.timing(fadeAnimValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateXValue, {
          toValue: -width,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => callback())
    },
    [fadeAnimValue],
  )
  return (
    <Animated.View
      style={[
        styles.listItem,
        {
          transform: [{ translateX: translateXValue }],
          opacity: fadeAnimValue,
        },
      ]}
    >
      <DemoCharacter item={item} onPress={() => fadeOut(() => onDelete(item.id))} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    alignSelf: "center",
    borderColor: color.palette.black,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 5,
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    width: "90%",
  },
})
