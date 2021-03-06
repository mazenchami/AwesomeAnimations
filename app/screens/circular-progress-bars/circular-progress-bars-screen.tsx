import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { CircularProgressBarsReaniamted } from "./circular-progress-bars-reaniamted"
import { CircularProgressBarsRN } from "./circular-progress-bars-rn"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

export const CircularProgressBarsScreen = observer(function CircularProgressBarsScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <View testID="CircularProgressBarsScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="circularProgressBarsScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        {/* <CircularProgressBarsReaniamted /> */}
        <CircularProgressBarsRN />
      </Screen>
    </View>
  )
})
