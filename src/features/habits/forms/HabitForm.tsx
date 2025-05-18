import { ScrollView, TouchableOpacity, View } from "react-native"
import Checkbox from "../../../components/Checkbox"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { router } from "expo-router"
import Text from "../../../components/Text"
import Tabs from "../../../components/Tabs"
import RepeatDropdown from "../components/habitsForm/RepeatDropdown"
import { FREQUENCY_OPTIONS } from "../consts/consts"
import { useHabitForm } from "@/features/habits/hooks/useHabitForm"
import { HabitFormType } from "@/features/habits/types/habitForm"
import SpecificDaysMultiTabsSecured from "@/features/habits/components/habitsForm/SpecificDaysMultiTabsSecured"
import IsLoadingProAccount from "@/features/subscriptions/components/IsLoadingProAccount"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

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
  const { partnerName } = useGetUser().user!

  const onCancel = () =>
    onCloseModal ? onCloseModal() : router.navigate("/home")

  const {
    isProLoading,
    toggleAreDifferentHabits,
    areDifferentHabits,
    errors,
    handleSubmit,
    values: { userLabel, partnerLabel, frequency },
    onChange,
  } = useHabitForm({ habitId, initialData, onSettled: onCancel })

  if (isProLoading) return <IsLoadingProAccount />

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      contentContainerClassName="gap-8 grow"
    >
      <Text className="mb-0" type="h1">
        {habitId ? "Update" : "Create"} a habit
      </Text>
      <View className="gap-4">
        <TouchableOpacity
          onPress={toggleAreDifferentHabits}
          activeOpacity={1}
          className="flex-row"
        >
          <Checkbox
            color="red"
            onPress={toggleAreDifferentHabits}
            isChecked={!!areDifferentHabits}
          />
          <Text className="text-center -ml-2.5 -mb-1">
            We want to implement different habits
          </Text>
        </TouchableOpacity>
        <Input
          errorMessage={errors.userLabel?.message}
          placeholder="Wake up before 6am"
          label={areDifferentHabits ? "My habit" : "Our habit"}
          value={userLabel}
          onChangeText={onChange.userLabel}
        />
        {areDifferentHabits && (
          <Input
            errorMessage={errors.partnerLabel?.message}
            placeholder="Read for at least 20 minutes"
            label={`${partnerName}'s habit`}
            value={partnerLabel}
            onChangeText={onChange.partnerLabel}
          />
        )}
      </View>
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
