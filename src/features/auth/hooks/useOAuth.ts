import { useCallback, useEffect, useState } from "react"
import * as WebBrowser from "expo-web-browser"
import { useOAuth as useOAuthWithClerk } from "@clerk/clerk-expo"
import * as Linking from "expo-linking"
import { showToast } from "@/utils/showToast"

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const strategyMap = {
  google: "oauth_google",
  apple: "oauth_apple",
} as const

export const useOAuth = ({
  strategy,
}: {
  strategy: keyof typeof strategyMap
}) => {
  useWarmUpBrowser()
  const [isLoading, setIsLoading] = useState(false)

  const { startOAuthFlow } = useOAuthWithClerk({
    strategy: strategyMap[strategy],
  })

  const onPress = useCallback(async () => {
    setIsLoading(true)
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("(authorized)", {
          scheme: "myapp",
        }),
      })

      if (createdSessionId) {
        await setActive!({ session: createdSessionId })
      }
    } catch (err: any) {
      showToast({
        type: "error",
        message: "We have a problem...",
        extraMessage: err?.message || "Something went wrong, try again later",
      })

      console.error("OAuth error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { startAuth: onPress, isLoading }
}
