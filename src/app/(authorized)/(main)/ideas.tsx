import SafeAreaWrapper from "../../../components/SafeAreaWrapper"
import Text from "../../../components/Text"
import IdeasScrollWithCategories from "@/features/ideas/components/IdeasScrollWithCategories"
import UnmountOnBlur from "@/components/UnmountOnBlur"

export default function Ideas() {
  return (
    <SafeAreaWrapper>
      <Text type="h1">Ideas</Text>
      <UnmountOnBlur>
        <IdeasScrollWithCategories />
      </UnmountOnBlur>
    </SafeAreaWrapper>
  )
}
