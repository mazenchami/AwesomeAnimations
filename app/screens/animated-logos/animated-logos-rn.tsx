import React, { useCallback, useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native"
import Svg, { Circle, Ellipse } from "react-native-svg"
import { Button } from "../../components"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse)

const REACT_NATIVE_COLOR = "#61DAFB"

const { width, height } = Dimensions.get("window")
const VIEW_WIDTH = width
const VIEW_HEIGHT = height / 2

interface CircleProps {
  progress: Animated.Value
}

interface EllipseProps {
  progress: Animated.Value
  targetValue: number
}

export const AnimatedLogosRN: React.FC = () => {
  const progress = useRef(new Animated.Value(0)).current
  const progress1 = useRef(new Animated.Value(0)).current
  const progress2 = useRef(new Animated.Value(0)).current
  const onPress = useCallback(() => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(progress1, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 500,
      }),
      Animated.timing(progress2, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 1000,
      }),
    ]).start()
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
  const fillOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const radius = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  })
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={VIEW_WIDTH} height={VIEW_HEIGHT}>
        <AnimatedCircle
          fill={REACT_NATIVE_COLOR}
          cx={VIEW_WIDTH / 2}
          cy={VIEW_HEIGHT / 2}
          r={radius}
          fillOpacity={fillOpacity}
        />
      </Svg>
    </View>
  )
}

const EllipseItem: React.FC<EllipseProps> = ({ progress, targetValue }) => {
  const [length, setLength] = useState(0)
  const ellipseRef = useRef(null)
  const spin = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${targetValue}deg`],
  })
  useEffect(() => {
    progress.addListener(({ value }) => {
      if (ellipseRef?.current) {
        ellipseRef.current.setNativeProps({
          strokeDashoffset: (length || 0) - value * (length || 0),
        })
      }
      return () => {
        progress.removeAllListeners()
      }
    })
  }, [progress, ellipseRef, length])
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate: spin }] }]}>
      <Svg width={VIEW_WIDTH} height={VIEW_HEIGHT}>
        <AnimatedEllipse
          cx={VIEW_WIDTH / 2}
          cy={VIEW_HEIGHT / 2}
          rx={VIEW_WIDTH / 4}
          ry={VIEW_HEIGHT / 2.1}
          stroke={REACT_NATIVE_COLOR}
          strokeWidth={20}
          ref={ellipseRef}
          onLayout={() => setLength(ellipseRef?.current?.getTotalLength() ?? 0)}
          strokeDasharray={length}
          strokeDashoffset={length * 1} // starting point
        />
      </Svg>
    </Animated.View>
  )
}
