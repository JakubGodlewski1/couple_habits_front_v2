import { View } from "react-native"
import Text from "@/components/Text"
import { SHORT_DAY_NAMES_MAP } from "@/features/habits/consts/consts"
import { DataFromPartnerRequest } from "@/features/shared/partnerRequests/types/partnerRequests"
import _ from "lodash"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

const PartnerRequestHabitDetails = ({
  data: { details },
}: {
  data: DataFromPartnerRequest
}) => {
  const { partnerName } = useGetUser().user!

  const update = () => {
    if (details.type === "update") {
      const { before, after } = details
      const areLabelsTheSame =
        before.userLabel === before.partnerLabel &&
        after.userLabel === after.partnerLabel

      const hasUserLabelChanged = before.userLabel !== after.userLabel
      const hasPartnerLabelChanged = before.partnerLabel !== after.partnerLabel

      return (
        <View className="mt-5 px-5">
          <Text className="font-main800 text-[20px]">Details: {"\n"}</Text>
          <View className="gap-2">
            {areLabelsTheSame ? (
              <>
                <View>
                  <Text className="font-main800  max-w-[200px]">Label</Text>
                  <Text
                    className={` ${hasUserLabelChanged ? "bg-primary/40" : ""} rounded-t-lg px-3 py-0.5`}
                  >
                    {before.userLabel}
                  </Text>
                  {hasUserLabelChanged && (
                    <Text className="bg-success/40 rounded-b-lg px-3 py-0.5">
                      {after.userLabel}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text className="font-main800  max-w-[200px]">
                    Your Label
                  </Text>
                  <Text
                    className={` ${hasUserLabelChanged ? "bg-primary/40" : ""}  rounded-t-lg px-3 py-0.5`}
                  >
                    {before.userLabel}
                  </Text>
                  {hasUserLabelChanged && (
                    <Text className="bg-success/40 rounded-b-lg px-3 py-0.5">
                      {after.userLabel}
                    </Text>
                  )}
                </View>

                <View>
                  <Text className="font-main800  max-w-[200px]">
                    {partnerName}&apos;s Label
                  </Text>
                  <Text
                    className={`${hasPartnerLabelChanged ? "bg-primary/40" : ""}  rounded-t-lg px-3 py-0.5`}
                  >
                    {before.partnerLabel}
                  </Text>
                  {hasPartnerLabelChanged && (
                    <Text className="bg-success/40 rounded-b-lg px-3 py-0.5">
                      {after.partnerLabel}
                    </Text>
                  )}
                </View>
              </>
            )}

            {!_.isEqual(before.frequency, after.frequency) && (
              <View>
                <Text className="font-main800  max-w-[200px]">Frequency</Text>
                <Text className="bg-primary/40 rounded-t-lg px-3 py-0.5">
                  {typeof before.frequency.value === "string"
                    ? before.frequency.value
                    : before.frequency.value
                        .map(
                          (day: keyof typeof SHORT_DAY_NAMES_MAP) =>
                            SHORT_DAY_NAMES_MAP[day],
                        )
                        .join(", ")}
                </Text>
                <Text className="bg-success/40 rounded-b-lg px-3 py-0.5">
                  {typeof after.frequency.value === "string"
                    ? after.frequency.value
                    : after.frequency.value
                        .map(
                          (day: keyof typeof SHORT_DAY_NAMES_MAP) =>
                            SHORT_DAY_NAMES_MAP[day],
                        )
                        .join(", ")}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }
  }

  const deleteOrCreate = () => {
    if (details.type !== "update") {
      const { partnerLabel, userLabel, frequency } = details
      const areLabelsTheSame = partnerLabel === userLabel

      return (
        <View className="mt-5 px-5">
          <Text className="font-main800 text-[20px]">Details: {"\n"}</Text>
          {areLabelsTheSame ? (
            <View className="flex-row gap-2">
              <Text className="font-main700 max-w-[100px]">Label</Text>
              <Text>{partnerLabel}</Text>
            </View>
          ) : (
            <>
              <View className="flex-row gap-2">
                <Text className="font-main800  max-w-[200px]">Your Label</Text>
                <Text>{userLabel}</Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="font-main800  max-w-[200px]">
                  {partnerName}&apos;s Label
                </Text>
                <Text>{partnerLabel}</Text>
              </View>
            </>
          )}
          <View className="flex-row gap-2">
            <Text className="font-main800  max-w-[100px]">Frequency:</Text>
            <Text>
              {typeof frequency.value === "string"
                ? frequency.value
                : frequency.value
                    .map(
                      (day: keyof typeof SHORT_DAY_NAMES_MAP) =>
                        SHORT_DAY_NAMES_MAP[day],
                    )
                    .join(", ")}
            </Text>
          </View>
        </View>
      )
    }
  }

  return details.type === "update" ? update() : deleteOrCreate()
}

export default PartnerRequestHabitDetails
