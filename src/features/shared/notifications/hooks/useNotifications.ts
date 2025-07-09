import { useCallback } from "react"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { endOfMonth, getDate, getMonth, getYear } from "date-fns"

type FlexibleSchedule = "daily" | "weekly" | "monthly" | number[]

type ScheduleInput = {
  id: string | number
  schedule: FlexibleSchedule
  hour: number
  minute: number
  title: string
  body: string
}

const STORAGE_KEY_PREFIX = "notifications:"

export function useNotifications() {
  const requestPermissions = useCallback(async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== "granted") {
        throw new Error("Permission to send notifications denied")
      }
    }
  }, [])

  const setupAndroidChannel = useCallback(async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("reminders", {
        name: "Reminders",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      })
    }
  }, [])

  const schedule = useCallback(
    async ({ id, schedule, hour, minute, title, body }: ScheduleInput) => {
      await requestPermissions()
      await setupAndroidChannel()
      await cancel(id)

      const notificationIds: string[] = []

      // Loosen trigger type here to avoid TS errors
      const createNotification = async (trigger: any) => {
        const nid = await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            sound: "default",
          },
          trigger: {
            ...trigger,
            type: "calendar",
          },
        })
        notificationIds.push(nid)
      }

      if (schedule === "daily") {
        await createNotification({ hour, minute, repeats: true })
      } else if (schedule === "weekly") {
        await createNotification({ weekday: 7, hour, minute, repeats: true }) // Sunday
      } else if (schedule === "monthly") {
        for (let i = 0; i < 12; i++) {
          const now = new Date()
          const targetDate = endOfMonth(
            new Date(now.getFullYear(), now.getMonth() + i),
          )
          await createNotification({
            year: getYear(targetDate),
            month: getMonth(targetDate) + 1,
            day: getDate(targetDate),
            hour,
            minute,
            repeats: false,
          })
        }
      } else if (Array.isArray(schedule)) {
        for (const day of schedule) {
          const expoWeekday = (day + 1) % 7 || 7
          await createNotification({
            weekday: expoWeekday,
            hour,
            minute,
            repeats: true,
          })
        }
      }

      await AsyncStorage.setItem(
        STORAGE_KEY_PREFIX + id.toString(),
        JSON.stringify(notificationIds),
      )
    },
    [requestPermissions, setupAndroidChannel],
  )

  const cancel = useCallback(async (id: string | number) => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PREFIX + id.toString())
    if (!raw) return

    const ids: string[] = JSON.parse(raw)
    for (const nid of ids) {
      try {
        await Notifications.cancelScheduledNotificationAsync(nid)
      } catch (e) {
        console.warn(`Failed to cancel notification ${nid}`, e)
      }
    }

    await AsyncStorage.removeItem(STORAGE_KEY_PREFIX + id.toString())
  }, [])

  return { schedule, cancel, requestPermissions }
}
