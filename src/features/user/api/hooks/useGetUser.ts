import { useAxios } from "@/api/hooks/useAxios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useGetUser = () => {
  const { getAxiosInstance } = useAxios()
  const getUser = async (): Promise<UserFromBackend> => {
    const axios = await getAxiosInstance()
    const response = await axios.get("/users")
    return response.data
  }

  const { data, error, isPending } = useQuery<UserFromBackend>({
    queryFn: getUser,
    queryKey: queryKeys.users.get,
  })

  return { user: data, error, isPending }
}
