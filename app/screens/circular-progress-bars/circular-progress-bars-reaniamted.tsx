import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { ReText } from "react-native-redash"
import Svg, { Circle } from "react-native-svg"
import { Button } from "../../components"
import { color } from "../../theme"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const { width } = Dimensions.get("window")
const CIRCLE_SIZE = width / 2
const CIRCLE_X_Y = CIRCLE_SIZE / 2
const CIRCLE_RADIUS = (CIRCLE_SIZE - 10) / 2
const CIRCLE_CIRCUMFERENCE = CIRCLE_RADIUS * 2 * Math.PI

export const CircularProgressBarsReaniamted: React.FC = () => {
  const progress = useSharedValue(0)
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_CIRCUMFERENCE * (1 - progress.value),
  }))
  const onPress = () => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 5000 })
  }
  const progressText = useDerivedValue(() => `${Math.floor(progress.value * 100)}%`)
  return (
    <View>
      <ReText style={styles.progressText} text={progressText} />
      <Svg width={width} height={width}>
        <AnimatedCircle
          cy={CIRCLE_X_Y}
          cx={CIRCLE_X_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          animatedProps={animatedProps}
          strokeDasharray={[`${CIRCLE_CIRCUMFERENCE}`]}
          strokeWidth={10}
          stroke="#5D2555"
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
