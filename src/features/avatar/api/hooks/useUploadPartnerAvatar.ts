import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { chooseImage } from "@/utils/chooseImage"
import { useUploadFile } from "@/api/hooks/useUploadFile"
import { router } from "expo-router"
import { queryKeys } from "@/config/queryKeys"

export const useUploadPartnerAvatar = () => {
  const { uploadFile } = useUploadFile()
  const queryClient = useQueryClient()

  const uploadAvatarMutation = async (uri: string) => {
    const { status, body } = await uploadFile({
      method: "PATCH",
      fileName: "avatar",
      endpoint: "/avatars",
      fileUri: uri,
    })

    if (status >= 400) {
      console.error(body)
      throw new Error("Something went wrong")
    }

    return {}
  }

  const { isPending, mutate, error } = useMutation({
    mutationKey: queryKeys.avatars.upload,
    mutationFn: uploadAvatarMutation,
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.avatars.get,
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
        message: "Avatar added successfully",
      })
    },
  })

  const optimisticUpdate = (uri: string) => {
    queryClient.setQueryData(
      queryKeys.avatars.get,
      (prev: AvatarsFromBackend) => ({
        ...prev,
        partnerAvatarBase64: uri,
      }),
    )
  }

  const uploadAvatar = async () => {
    //select image
    const uri = await chooseImage(0.5)
    if (uri) {
      optimisticUpdate(uri)
      router.replace("/partner-home")
      mutate(uri)
    }
  }

  return { isPending, uploadPartnerAvatar: uploadAvatar, error }
}
