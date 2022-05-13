import React, { useCallback, useRef } from "react"
import { Animated, Dimensions, StyleSheet, TextInput, View } from "react-native"
import Svg, { Circle } from "react-native-svg"
import { Button } from "../../components"
import { color } from "../../theme"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const { width } = Dimensions.get("window")
const CIRCLE_SIZE = width / 2
const CIRCLE_X_Y = CIRCLE_SIZE / 2
const CIRCLE_RADIUS = (CIRCLE_SIZE - 10) / 2
const CIRCLE_CIRCUMFERENCE = CIRCLE_RADIUS * 2 * Math.PI

export const CircularProgressBarsRN: React.FC = () => {
  const animatedTextInputRef = useRef<TextInput>()
  const animatedCircleRef = useRef<typeof AnimatedCircle>()
  const progress = useRef(new Animated.Value(0)).current
  const progressValue = useRef(0)
  const onPress = useCallback(() => {
    progress.addListener(({ value }) => {
      progressValue.current = value
      if (animatedTextInputRef?.current) {
        animatedTextInputRef.current.setNativeProps({
          text: `${Math.round(value * 100)}%`,
        })
      }
      if (animatedCircleRef?.current) {
        animatedCircleRef.current.setNativeProps({
          strokeDashoffset: CIRCLE_CIRCUMFERENCE * (1 - value),
        })
      }
      return () => {
        progress.removeAllListeners()
      }
    })
    Animated.timing(progress, {
      toValue: progressValue.current > 0 ? 0 : 1,
      useNativeDriver: true,
      duration: 3000,
    }).start()
  }, [])
  return (
    <View>
      <AnimatedTextInput
        style={styles.progressText}
        editable={false}
        ref={animatedTextInputRef}
        value={"0%"}
      />
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <AnimatedCircle
          cx={CIRCLE_X_Y}
          cy={CIRCLE_X_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          ref={animatedCircleRef}
          stroke={"#5D2555"}
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={CIRCLE_CIRCUMFERENCE * 1} // starting point
          strokeLinecap={"round"}
          strokeWidth={10}
        />
      </Svg>
      <Button text="RUN" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  progressText: {
    color: color.palette.white,
    fontSize: 60,
  },
})
