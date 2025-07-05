import { useAuth } from "@clerk/clerk-expo"
import axios, { AxiosInstance } from "axios"
import { API_URL } from "@/config/apiUrl"
import { Temporal } from "@js-temporal/polyfill"
import { useAppForegroundTracker } from "@/hooks/useAppForegroundTracker"

export const useAxios = () => {
  const { getToken } = useAuth()
  const { loadedFromBackground, resetLoadedFromBackground } =
    useAppForegroundTracker()

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    const token = loadedFromBackground
      ? await getToken({ skipCache: true })
      : await getToken()

    if (loadedFromBackground) resetLoadedFromBackground()

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
