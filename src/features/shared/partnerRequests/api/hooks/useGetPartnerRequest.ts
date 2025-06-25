import { useAxios } from "@/api/hooks/useAxios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useGetPartnerRequest = () => {
  const { getAxiosInstance } = useAxios()

  const getPartnerRequest = async () => {
    const axios = await getAxiosInstance()

    const res = await axios.get("/partner-requests")
    return res.data as PartnerRequestFromBackend
  }

  const { isPending, data, isError } = useQuery({
    queryKey: queryKeys.partnerRequests.get,
    queryFn: getPartnerRequest,
  })

  return { isError, isPending, data }
}
