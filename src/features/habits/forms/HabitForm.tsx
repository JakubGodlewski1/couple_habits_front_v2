import { ScrollView, View } from "react-native"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { router } from "expo-router"
import Text from "../../../components/Text"
import Tabs from "../../../components/Tabs"
import RepeatDropdown from "../components/habitsForm/RepeatDropdown"
import { FREQUENCY_OPTIONS } from "../consts/consts"
import { useHabitForm } from "@/features/habits/hooks/useHabitForm"
import { HabitFormType } from "@/features/habits/types/habitForm"
import SpecificDaysMultiTabs from "@/features/habits/components/habitsForm/SpecificDaysMultiTabs"
import { useHideTabbarContext } from "@/contexts/HideTabbar"

type Props = {
  initialData?: HabitFormType
  habitId?: number
  onCloseModal?: () => void
}

export default function HabitForm({
  habitId,
  onCloseModal,
  initialData,
}: Props) {
  const { setIsHidden } = useHideTabbarContext()

  const onCancel = () => {
    if (onCloseModal) onCloseModal()
    setIsHidden(false)
    router.navigate("/home")
  }

  const {
    isLoading,
    errors,
    handleSubmit,
    values: { label, frequency },
    onChange,
  } = useHabitForm({ habitId, initialData, onSettled: onCancel })

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      contentContainerClassName="gap-5 grow"
    >
      <Text className="mb-0" type="h1">
        {habitId ? "Update" : "Create"} a habit
      </Text>
      <View className="gap-4">
        <Input
          errorMessage={errors.label?.message}
          placeholder="Wake up before 6am"
          label="Habit name"
          value={label}
          onChangeText={onChange.label}
        />
      </View>
      {!habitId && (
        <View>
          <Text className="mb-2">How often</Text>
          <Tabs
            className="mb-2"
            options={FREQUENCY_OPTIONS}
            onPress={onChange.tabs}
            value={frequency.type}
          />
          {frequency.type === "repeat" ? (
            <RepeatDropdown
              onChange={onChange.dropdown}
              value={frequency.value}
            />
          ) : (
            <SpecificDaysMultiTabs
              onChange={onChange.specificDaysValue}
              value={frequency.value}
            />
          )}
        </View>
      )}
      <View className="flex-row gap-4 mt-auto">
        <Button
          classNames={{
            wrapper: "flex-1",
          }}
          type="subtle"
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          disabled={isLoading}
          classNames={{
            wrapper: "flex-1",
          }}
          onPress={handleSubmit}
          title={habitId ? "Update" : "Create"}
        />
      </View>
    </ScrollView>
  )
}
