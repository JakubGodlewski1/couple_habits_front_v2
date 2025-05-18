import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const useClearAllCacheData = () => {
  const [isResetting, setIsResetting] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    const refetchAllQueries = async () => {
      try {
        setIsResetting(true)
        await queryClient.clear()
      } catch (err) {
        console.error({
          error: err,
        })
      } finally {
        setIsResetting(false)
      }
    }

    refetchAllQueries()
  }, [])

  return { isResetting }
}
