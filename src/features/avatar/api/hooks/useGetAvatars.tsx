import { useAxios } from "@/api/hooks/useAxios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useGetAvatars = () => {
  const { getAxiosInstance } = useAxios()

  const getAvatars = async (): Promise<AvatarsFromBackend> => {
    const axios = await getAxiosInstance()
    const res = await axios.get("/avatars")
    return res.data
  }

  const {
    isPending,
    data: avatars,
    isError,
  } = useQuery<AvatarsFromBackend>({
    queryFn: getAvatars,
    queryKey: queryKeys.avatars.get,
  })

  return { isPending, isError, avatars }
}
