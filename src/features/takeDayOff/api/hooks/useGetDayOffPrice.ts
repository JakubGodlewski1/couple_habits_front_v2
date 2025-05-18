import { useQuery } from "@tanstack/react-query"
import { useAxios } from "@/api/hooks/useAxios"
import { queryKeys } from "@/config/queryKeys"

export const useGetDayOffPrice = () => {
  const { getAxiosInstance } = useAxios()

  const getDayOffPrice = async (): Promise<DayOff> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/days-off")
    return response.data
  }

  const { data, error, isPending } = useQuery<DayOff>({
    queryFn: getDayOffPrice,
    queryKey: queryKeys.dayOff.get,
  })

  return { data, error, isPending }
}
