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
import { useHideTabbarContext } from "@/contexts/HideTabbar"
import SpecificDaysMultiTabsSecured from "@/features/habits/components/habitsForm/SpecificDaysMultiTabsSecured"
import CreateHabitBtnSecured from "@/features/habits/components/habitsForm/CreateHabitBtnSecured"
import CreateSharedHabitCheckbox from "@/features/habits/components/habitsForm/createSharedHabitCheckbox"
import OpenIdeasModalBtn from "@/features/ideas/components/OpenIdeasModalBtn"
import SetReminder from "@/features/habits/components/habitsForm/SetReminder"

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
    reminders,
    isPending,
    errors,
    handleSubmit,
    values: { label, frequency, isShared },
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
        <View className="flex-row gap-2 items-end">
          <Input
            className="flex-1"
            errorMessage={errors.label?.message}
            placeholder="Wake up before 6am"
            label="Habit name"
            value={label}
            onChangeText={onChange.label}
          />
          <View className={errors.label?.message ? "mb-9" : ""}>
            <OpenIdeasModalBtn setSelectedLabel={onChange.label} />
          </View>
        </View>
      </View>
      {!habitId && (
        <CreateSharedHabitCheckbox
          onPress={onChange.isShared}
          isChecked={!!isShared}
        />
      )}

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
          <SpecificDaysMultiTabsSecured
            onChange={onChange.specificDaysValue}
            value={frequency.value}
          />
        )}
      </View>
      <SetReminder {...reminders} />
      <View className="flex-row gap-4 mt-auto">
        <Button
          classNames={{
            wrapper: "flex-1",
          }}
          type="subtle"
          onPress={onCancel}
          title="Cancel"
        />
        <CreateHabitBtnSecured
          isPending={isPending}
          handleSubmit={handleSubmit}
          habitId={habitId}
        />
      </View>
    </ScrollView>
  )
}
