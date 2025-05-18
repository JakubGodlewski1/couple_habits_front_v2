import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema } from "@/features/user/schermas/updateUserSchema"
import { useMutate } from "@/api/hooks/useMutate"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { queryKeys } from "@/config/queryKeys"

export const useUpdatePartnerNameForm = ({
  onSettled,
}: {
  onSettled?: () => void
}) => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
  })

  const { update, isPending } = useMutate({
    endpoint: "/users",
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.get,
      })
    },
    onError: (error) => {
      showToast({
        type: "error",
        message: getAxiosErrorMessage(error) || "Something went wrong",
      })
    },
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Name updated successfully",
      })
    },
  })

  const onSubmit = ({ partnerName }: UpdateUser) => {
    queryClient.setQueryData(queryKeys.users.get, (prev: UserFromBackend) => ({
      ...prev,
      partnerName,
    }))
    if (onSettled) onSettled() //close form
    router.push("/home")
    update({ update: { partnerName } })
  }

  return { control, errors, isPending, onSubmit: handleSubmit(onSubmit) }
}
