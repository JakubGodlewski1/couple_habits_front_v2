import { useEffect } from "react"
import Purchases, { LOG_LEVEL } from "react-native-purchases"
import { Platform } from "react-native"

const IOS_RC_KEY = process.env.EXPO_PUBLIC_REVENUE_CAT_IOS
const ANDROID_RC_KEY = process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID

if (!IOS_RC_KEY) throw new Error("Ios revenue cat api key is missing")

if (!ANDROID_RC_KEY) throw new Error("Ios revenue cat api key is missing")

export const useRegisterPurchaseObj = ({
  user: { gameAccountId },
}: {
  user: UserFromBackend
}) => {
  useEffect(() => {
    if (!gameAccountId) return
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE)

    const apiKey = Platform.OS === "ios" ? IOS_RC_KEY : ANDROID_RC_KEY
    Purchases.configure({ apiKey, appUserID: gameAccountId.toString() })
  }, [gameAccountId])
}
