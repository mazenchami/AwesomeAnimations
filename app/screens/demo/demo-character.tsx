import React from "react"
import { Image, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { Character } from "../../models/character/character"
import { Text } from "../../components"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}

interface Props {
  item: Character
}

export const DemoCharacter: React.FC<Props> = ({ item }) => {
  return (
    <View style={LIST_CONTAINER}>
      <Image source={{ uri: item.image }} style={IMAGE} />
      <Text style={LIST_TEXT}>
        {item.name} ({item.status})
      </Text>
    </View>
  )
}
