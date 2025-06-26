import { ScrollView, TouchableOpacity, View } from "react-native"
import Text from "@/components/Text"
import l from "lodash"
import { vibrate } from "@/utils/vibrate"

type Props = {
  categories: IdeaCategory[]
  selectedCategory: IdeaCategory
  onCategoryChange: (value: IdeaCategory) => void
}

const Categories = ({
  categories,
  onCategoryChange,
  selectedCategory,
}: Props) => {
  return (
    <View className="mb-3">
      <ScrollView
        className="flex flex-row gap-3 "
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((categoryLabel) => (
          <CategoryPill
            key={categoryLabel}
            categoryLabel={categoryLabel}
            onCategoryChange={onCategoryChange}
            selectedCategory={selectedCategory}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const CategoryPill = ({
  categoryLabel,
  selectedCategory,
  onCategoryChange,
}: {
  categoryLabel: IdeaCategory
  selectedCategory: IdeaCategory
  onCategoryChange: (value: IdeaCategory) => void
}) => {
  const isSelected = selectedCategory === categoryLabel

  return (
    <TouchableOpacity
      activeOpacity={100}
      style={{
        transform: [{ scale: isSelected ? 1 : 0.95 }],
      }}
      onPress={() => {
        vibrate()
        onCategoryChange(categoryLabel)
      }}
      className={`${isSelected ? "bg-primary mx-1.5" : "bg-primary/75"} rounded-lg py-1.5 px-5`}
    >
      <Text className={`text-white`}>{l.capitalize(categoryLabel)}</Text>
    </TouchableOpacity>
  )
}
