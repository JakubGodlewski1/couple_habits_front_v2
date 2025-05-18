import { forwardRef } from "react"
import { ScrollView, View } from "react-native"
import IdeaCard from "@/features/ideas/components/IdeaCard"

type Props = {
  selectedIdeas: string[]
}

const IdeasScrollView = forwardRef<ScrollView, Props>(
  ({ selectedIdeas }, ref) => {
    return (
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        {selectedIdeas.map((_, i) => {
          if (i * 2 + 1 >= selectedIdeas.length) return null
          return (
            <View key={i} className="flex-row mb-2 gap-2">
              <IdeaCard label={selectedIdeas[i * 2]} />
              <IdeaCard label={selectedIdeas[i * 2 + 1]} />
            </View>
          )
        })}
        <View className="h-52" />
      </ScrollView>
    )
  },
)

IdeasScrollView.displayName = "IdeasScrollView"

export default IdeasScrollView
