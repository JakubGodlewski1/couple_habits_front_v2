import {
  DataFromPartnerRequest,
  PartnerRequestsOption,
} from "@/features/shared/partnerRequests/types/partnerRequests"
import { useCreateHabit } from "@/features/habits/api/hooks/useCreateHabit"
import { useDeleteHabit } from "@/features/habits/api/hooks/useDeleteHabit"
import { useUpdateHabit } from "@/features/habits/api/hooks/useUpdateHabit"
import useTakeDayOff from "@/features/takeDayOff/api/hooks/useTakeDayOff"
import { useQueryClient } from "@tanstack/react-query"
import useDeletePartnerRequest from "@/features/shared/partnerRequests/api/hooks/useDeletePartnerRequest"
import { queryKeys } from "@/config/queryKeys"

type Props = {
  option: PartnerRequestsOption
  data: DataFromPartnerRequest
}

export const useGetPartnerRequestFunction = ({ option, data }: Props) => {
  const { createHabit, isPending: createHabitIsPending } = useCreateHabit()
  const { deleteHabit, isPending: deleteHabitIsPending } = useDeleteHabit()
  const { updateHabit, isPending: updateHabitIsPending } = useUpdateHabit()
  const { takeDayOff, isPending: takeDayOffIsPending } = useTakeDayOff()

  const { deletePartnerRequest } = useDeletePartnerRequest()

  const queryClient = useQueryClient()

  if (!data) {
    if (
      option === "createHabit" ||
      option === "updateHabit" ||
      option === "deleteHabit"
    ) {
      throw new Error("Partner request is missing data")
    }
  }

  const isPending =
    createHabitIsPending ||
    updateHabitIsPending ||
    deleteHabitIsPending ||
    takeDayOffIsPending

  const fnMap: Record<PartnerRequestsOption, any> = {
    createHabit: () => createHabit(data.body),
    deleteHabit: () => {
      deleteHabit(data.body)
    },
    updateHabit: () => updateHabit(data.body),
    takeDayOff: takeDayOff,
  }

  return {
    onPress: () => {
      deletePartnerRequest()
      fnMap[option]()
      queryClient.setQueryData(queryKeys.partnerRequests.get, () => ({}))
    },
    isPending,
  }
}
