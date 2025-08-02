import { useEffect, useMemo } from "react"
import { Alert, Platform } from "react-native"
import * as Notifications from "expo-notifications"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { habitFilters } from "@/features/habits/filters/filters"

export const useIconBadge = () => {
  const { data: habits } = useGetHabits()

  const uncompletedCount = useMemo(() => {
    if (!habits) return 0
    const userCount =
      habits.user
        ?.filter(habitFilters.isIncompleted)
        .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)
        .length || 0
    const partnerCount =
      habits.partner
        ?.filter(habitFilters.isIncompleted)
        .filter(habitFilters.scheduledForTodayIncludingWeeklyAndMonthly)
        .length || 0
    return userCount + partnerCount
  }, [habits])

  useEffect(() => {
    if (!habits || habits.user.length === 0 || habits.partner.length === 0)
      return

    const checkAndRequestPermissions = async () => {
      try {
        const settings = await Notifications.getPermissionsAsync()

        if (
          !settings.granted ||
          (Platform.OS === "ios" && !settings.ios?.status)
        ) {
          Alert.alert(
            "Wanna see some magic? ✨",
            "We can show you a shiny little badge on your app icon to keep track of your habits! 🔔 Would you like to turn this on?",
            [
              {
                text: "Nah, I’m good",
              },
              {
                text: "Yes, bring the magic! ✨",
                style: "cancel",
                onPress: async () => {
                  const newStatus = await Notifications.requestPermissionsAsync(
                    {
                      ios: { allowBadge: true },
                    },
                  )
                  console.log("Permission status:", newStatus)
                },
              },
            ],
          )
        }
      } catch (err) {
        console.warn("Failed to check notification permissions:", err)
      }
    }

    checkAndRequestPermissions()
  }, [habits])

  useEffect(() => {
    if (!habits) return
    Notifications.setBadgeCountAsync(uncompletedCount).catch((err) =>
      console.warn("Failed to set badge count:", err),
    )
  }, [uncompletedCount, habits])
}
