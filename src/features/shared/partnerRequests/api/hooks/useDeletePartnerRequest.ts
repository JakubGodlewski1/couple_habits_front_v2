import { useMutation } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { queryKeys } from "@/config/queryKeys"

export default function useDeletePartnerRequest() {
  const { getAxiosInstance } = useAxios()

  const deletePartnerRequestMutation = async (): Promise<void> => {
    const axios = await getAxiosInstance()
    return axios.delete("/partner-requests")
  }

  const {
    isError,
    isSuccess,
    mutate: deletePartnerRequest,
    mutateAsync: deletePartnerRequestAsync,
    isPending,
    error,
  } = useMutation({
    mutationKey: queryKeys.partnerRequests.delete,
    mutationFn: deletePartnerRequestMutation,
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      showToast({
        type: "error",
        message: message || "Something went wrong",
      })
    },
  })

  return {
    deletePartnerRequestAsync,
    deletePartnerRequest,
    isSuccess,
    isPending,
    error,
    isError,
  }
}
