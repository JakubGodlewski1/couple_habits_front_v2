import SafeAreaWrapper from "../../../../components/SafeAreaWrapper"
import HabitForm from "../../../../features/habits/forms/HabitForm"
import UnmountOnBlur from "@/components/UnmountOnBlur"

export default function AddHabit() {
  return (
    <UnmountOnBlur>
      <SafeAreaWrapper>
        <HabitForm />
      </SafeAreaWrapper>
    </UnmountOnBlur>
  )
}
