import Categories from "@/features/ideas/components/Categories"
import IdeasScrollView from "@/features/ideas/components/IdeasScrollView"
import { ideas } from "@/features/ideas/data/ideas"
import { useEffect, useRef, useState } from "react"
import { ScrollView } from "react-native"

const IdeasScrollWithCategories = () => {
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
    <>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(value: IdeaCategory) => setSelectedCategory(value)}
      />
      <IdeasScrollView ref={scrollViewRef} selectedIdeas={selectedIdeas} />
    </>
  )
}

export default IdeasScrollWithCategories
