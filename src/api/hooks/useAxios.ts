import { useAuth } from "@clerk/clerk-expo"
import axios, { AxiosInstance } from "axios"
import { API_URL } from "@/config/apiUrl"
import { Temporal } from "@js-temporal/polyfill"

export const useAxios = () => {
  const { getToken } = useAuth()

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    const token = await getToken()

    const getUserTimeZone = () => Temporal.Now.timeZoneId()

    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-time-zone": getUserTimeZone(),
      },
    })
  }

  return { getAxiosInstance }
}
