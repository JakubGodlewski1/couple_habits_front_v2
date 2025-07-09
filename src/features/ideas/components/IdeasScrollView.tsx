import { forwardRef } from "react"
import { ScrollView, View } from "react-native"
import IdeaCard from "@/features/ideas/components/IdeaCard"

type Props = {
  selectedIdeas: string[]
  setSelectedLabel: (label: string) => void
  onClose: () => void
}

const IdeasScrollView = forwardRef<ScrollView, Props>(
  ({ selectedIdeas, setSelectedLabel, onClose }, ref) => {
    return (
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        {selectedIdeas.map((_, i) => {
          if (i * 2 + 1 >= selectedIdeas.length) return null
          return (
            <View key={i} className="flex-row mb-2 gap-2">
              <IdeaCard
                onClose={onClose}
                setSelectedLabel={setSelectedLabel}
                label={selectedIdeas[i * 2]}
              />
              <IdeaCard
                onClose={onClose}
                setSelectedLabel={setSelectedLabel}
                label={selectedIdeas[i * 2 + 1]}
              />
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
