import React from "react"
import { ViewStyle, View, StyleSheet } from "react-native"
import Animated, { FadeOutLeft, Layout, SlideInRight } from "react-native-reanimated"
import { Button } from "../../components"
import { color, spacing } from "../../theme"
import { DemoCharacter } from "./demo-character"
import { useCharacterHelpers } from "./useCharacterHelpers"

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const AnimatedView = Animated.createAnimatedComponent(View)

export const DemoReanimated: React.FC = () => {
  const { characters, onDelete, onAdd } = useCharacterHelpers()
  return (
    <View>
      <Button text="+" onPress={onAdd} />
      <Animated.FlatList
        contentContainerStyle={FLAT_LIST}
        data={[...characters]}
        keyExtractor={(item) => String(item.id)}
        itemLayoutAnimation={Layout.springify()}
        renderItem={({ item, index }) => (
          <AnimatedView
            entering={SlideInRight.delay(index * 100)}
            exiting={FadeOutLeft}
            style={styles.listItem}
          >
            <DemoCharacter item={item} onPress={(id) => onDelete(id)} />
          </AnimatedView>
        )}
      />
    </View>
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
