import { useAxios } from "@/api/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { withWarning } from "@/utils/withWarning"
import { showToast } from "@/utils/showToast"
import { queryKeys } from "@/config/queryKeys"
import { useSignOut } from "@/features/auth/hooks/useSignOut"

export const useDeleteAccount = () => {
  const { getAxiosInstance } = useAxios()
  const { signOut } = useSignOut()

  const deleteAccountMutation = async () => {
    const axios = await getAxiosInstance()
    return await axios.delete("/users")
  }

  const { isPending, mutate: deleteAccount } = useMutation({
    mutationKey: queryKeys.users.delete,
    mutationFn: deleteAccountMutation,
    onError: (error) => {
      showToast({
        type: "error",
        message: error.message,
      })
    },
    onSuccess: async () => {
      await signOut()
      showToast({
        type: "success",
        message: "You have deleted your account successfully!",
      })
    },
  })

  const deleteAccountWithWarning = () =>
    withWarning({
      message: "Are you sure you want to delete your account?",
      btnLabel: "Permanently delete",
      onPress: deleteAccount,
    })

  return { isPending, deleteAccountWithWarning }
}
