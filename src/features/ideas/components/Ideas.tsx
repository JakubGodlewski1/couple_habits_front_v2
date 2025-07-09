import Categories from "@/features/ideas/components/Categories"
import IdeasScrollView from "@/features/ideas/components/IdeasScrollView"
import { ideas } from "@/features/ideas/data/ideas"
import { useEffect, useRef, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import Text from "@/components/Text"
import { AntDesign } from "@expo/vector-icons"

type Props = {
  onClose: () => void
  setSelectedLabel: (label: string) => void
}

const Ideas = ({ onClose, setSelectedLabel }: Props) => {
  const categories = Object.keys(ideas) as IdeaCategory[]
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory>(
    categories[0],
  )
  const selectedIdeas = ideas[selectedCategory]

  const scrollViewRef = useRef<ScrollView>(null)

  // Scroll to top when selectedCategory changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false })
  }, [selectedCategory])

  return (
    <View>
      <View className="flex-row gap-4 justify-between mt-4">
        <Text className="mb-0" type="h1">
          Ideas
        </Text>
        <TouchableOpacity onPress={onClose} className="p-1">
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(value: IdeaCategory) => setSelectedCategory(value)}
      />
      <IdeasScrollView
        onClose={onClose}
        setSelectedLabel={setSelectedLabel}
        ref={scrollViewRef}
        selectedIdeas={selectedIdeas}
      />
    </View>
  )
}

export default Ideas
