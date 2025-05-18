import { useAuth } from "@clerk/clerk-expo"
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios"
import { API_URL } from "@/config/apiUrl"
import { showToast } from "@/utils/showToast"
import { useSignOut } from "@/features/auth/hooks/useSignOut"
import { Temporal } from "@js-temporal/polyfill"

export const useAxios = () => {
  const { getToken } = useAuth()
  const { signOut } = useSignOut()

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    const token = await getToken()

    const getUserTimeZone = () => {
      return Temporal.Now.timeZoneId()
    }

    // Create Axios instance
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-time-zone": getUserTimeZone(),
      },
    })

    // Add response interceptor for global error handling
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Pass through successful responses
        return response
      },
      (error: AxiosError) => {
        const { response } = error

        if (response) {
          // Check for 4XX status codes
          if (response.status === 403) {
            console.log("should log out")
            // Perform logout action
            signOut()

            // Show a toast or notification
            showToast({
              type: "error",
              message: "Session expired or unauthorized. Logging out...",
            })
          }
        } else {
          // Handle cases where the server doesn't respond
          console.error("Network error or server is unreachable.")
        }

        // Always reject the error to allow individual requests to handle it too
        return Promise.reject(error)
      },
    )

    return axiosInstance
  }

  return { getAxiosInstance }
}
