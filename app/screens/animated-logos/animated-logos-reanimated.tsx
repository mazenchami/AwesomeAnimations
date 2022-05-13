import React, { useCallback, useRef } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated"
import Svg, { Circle, Ellipse } from "react-native-svg"
import { Button } from "../../components"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse)

const REACT_NATIVE_COLOR = "#61DAFB"

const { width, height } = Dimensions.get("window")
const VIEW_WIDTH = width
const VIEW_HEIGHT = height / 2

interface CircleProps {
  progress: Animated.SharedValue<number>
}

interface EllipseProps {
  progress: Animated.SharedValue<number>
  targetValue: number
}

export const AnimatedLogosReanimated: React.FC = () => {
  const progress = useSharedValue(0)
  const progress1 = useSharedValue(0)
  const progress2 = useSharedValue(0)
  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000 })
    progress1.value = withDelay(500, withTiming(progress1.value > 0 ? 0 : 1, { duration: 3000 }))
    progress2.value = withDelay(1000, withTiming(progress2.value > 0 ? 0 : 1, { duration: 3000 }))
  }, [progress, progress1, progress2])
  return (
    <>
      <View style={{ height: VIEW_HEIGHT, width: VIEW_WIDTH }}>
        <CircleItem progress={progress} />
        <EllipseItem progress={progress} targetValue={-30} />
        <EllipseItem progress={progress1} targetValue={30} />
        <EllipseItem progress={progress2} targetValue={90} />
      </View>
      <Button text="RUN" onPress={onPress} />
    </>
  )
}

const CircleItem: React.FC<CircleProps> = ({ progress }) => {
  const animatedProps = useAnimatedProps(() => ({
    r: progress.value * 20,
    fillOpacity: progress.value,
  }))
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={VIEW_WIDTH} height={VIEW_HEIGHT}>
        <AnimatedCircle
          fill={REACT_NATIVE_COLOR}
          cx={VIEW_WIDTH / 2}
          cy={VIEW_HEIGHT / 2}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  )
}

const EllipseItem: React.FC<EllipseProps> = ({ progress, targetValue }) => {
  const [length, setLength] = React.useState(0)
  const ellipseRef = useRef(null)
  const rotate = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * targetValue}deg` }],
  }))
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - progress.value * length,
  }))
  return (
    <Animated.View style={[StyleSheet.absoluteFill, rotate]}>
      <Svg width={VIEW_WIDTH} height={VIEW_HEIGHT}>
        <AnimatedEllipse
          stroke={REACT_NATIVE_COLOR}
          cx={VIEW_WIDTH / 2}
          cy={VIEW_HEIGHT / 2}
          rx={VIEW_WIDTH / 4}
          ry={VIEW_HEIGHT / 2.1}
          strokeWidth={20}
          ref={ellipseRef}
          onLayout={() => setLength(ellipseRef.current.getTotalLength())}
          animatedProps={animatedProps}
          strokeDasharray={length}
        />
      </Svg>
    </Animated.View>
  )
}
