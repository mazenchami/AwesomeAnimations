import React, { useRef } from "react"
import { Animated as RNAnimated, View, ViewStyle, TextStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = {
  backgroundColor: "#20162D",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const CONTINUE_EXTRA: ViewStyle = {
  marginBottom: spacing[3],
}
const BOX_STYLE: ViewStyle = {
  height: 100,
  width: 100,
  backgroundColor: "red",
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const animatedListsScreen = () => navigation.navigate("demoList")
  const circularProgressBarsScreen = () => navigation.navigate("circularProgressBars")
  const animatedLogosScreen = () => navigation.navigate("animatedLogos")

  const x = useSharedValue(0)
  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withDelay(1000, withTiming(x.value, { duration: 1000 })) }],
  }))

  const rnX = new RNAnimated.Value(0)
  const rnXValue = useRef(0)
  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Animated.View style={[BOX_STYLE, boxStyle]} />
        <Button text="Reanimated Increment" onPress={() => (x.value += 10)} />
        <RNAnimated.View style={[BOX_STYLE, { transform: [{ translateX: rnX }] }]} />
        <Button
          text="RN Increment"
          onPress={() => {
            rnXValue.current += 10
            RNAnimated.timing(rnX, {
              toValue: rnXValue.current,
              duration: 1000,
              useNativeDriver: true,
            }).start()
          }}
        />
      </Screen>
      <SafeAreaView style={FOOTER}>
        <Button
          testID="next-screen-button"
          style={[CONTINUE, CONTINUE_EXTRA]}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.animatedLists"
          onPress={animatedListsScreen}
        />
        <Button
          testID="next-screen-button"
          style={[CONTINUE, CONTINUE_EXTRA]}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.circularProgressBars"
          onPress={circularProgressBarsScreen}
        />
        <Button
          testID="next-screen-button"
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.animatedLogos"
          onPress={animatedLogosScreen}
        />
      </SafeAreaView>
    </View>
  )
})
