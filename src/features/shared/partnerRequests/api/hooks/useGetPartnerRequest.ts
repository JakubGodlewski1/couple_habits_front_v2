import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { PartnerRequestFromBackend } from "@/features/shared/partnerRequests/types/partnerRequests"
import { queryKeys } from "@/config/queryKeys"

export const useGetPartnerRequest = () => {
  const { getAxiosInstance } = useAxios()

  const getPartnerRequest = async (): Promise<PartnerRequestFromBackend> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/partner-requests")
    return response.data
  }

  const { data, error, isPending, isFetching } =
    useQuery<PartnerRequestFromBackend>({
      queryFn: getPartnerRequest,
      gcTime: 0,
      staleTime: 0,
      queryKey: queryKeys.partnerRequests.get,
    })

  return { data, error, isPending, isFetching }
}
