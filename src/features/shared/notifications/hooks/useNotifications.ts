import { useCallback, useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { endOfMonth, getDate, getMonth, getYear } from "date-fns"

type FlexibleSchedule = "daily" | "weekly" | "monthly" | number[]

type ScheduleInput = {
  id: string | number
  frequency: FlexibleSchedule
  hour: number
  minute: number
  title: string
  body: string
}

const STORAGE_KEY_PREFIX = "notifications:"

export function useNotifications() {
  const [scheduledReminders, setScheduledReminders] = useState<
    { id: string; hour: number; minute: number }[]
  >([])

  useEffect(() => {
    const loadReminderInfo = async () => {
      const keys = await AsyncStorage.getAllKeys()
      const reminderKeys = keys.filter((key) =>
        key.startsWith(STORAGE_KEY_PREFIX),
      )

      const stored: Record<string, string[]> = {}
      for (const fullKey of reminderKeys) {
        const id = fullKey.replace(STORAGE_KEY_PREFIX, "")
        const raw = await AsyncStorage.getItem(fullKey)
        if (!raw) continue
        stored[id] = JSON.parse(raw)
      }

      const scheduled = await Notifications.getAllScheduledNotificationsAsync()

      const result: { id: string; hour: number; minute: number }[] = []

      for (const [habitId, notificationIds] of Object.entries(stored)) {
        const matching = scheduled.find((n) =>
          notificationIds.includes(n.identifier),
        )

        const trigger = matching?.trigger

        if (trigger && "dateComponents" in trigger) {
          const dc = trigger.dateComponents as {
            hour?: number
            minute?: number
          }

          if (dc.hour !== undefined && dc.minute !== undefined) {
            result.push({
              id: habitId,
              hour: dc.hour,
              minute: dc.minute,
            })
          }
        }
      }

      setScheduledReminders(result)
    }

    loadReminderInfo()
  }, [])

  const requestPermissions = useCallback(async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()

    if (existingStatus === "granted") {
      return { status: "granted" }
    }

    if (existingStatus === "denied") {
      return { status: "denied" }
    }

    const { status } = await Notifications.requestPermissionsAsync()

    if (status === "granted") {
      return { status: "granted" }
    }

    if (status === "denied") {
      return { status: "denied" }
    }

    // Sometimes user dismisses prompt or it remains undetermined
    return { status: "undetermined" }
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
    async ({ id, frequency, hour, minute, title, body }: ScheduleInput) => {
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

      if (frequency === "daily") {
        await createNotification({ hour, minute, repeats: true })
      } else if (frequency === "weekly") {
        await createNotification({ weekday: 7, hour, minute, repeats: true }) // Sunday
      } else if (frequency === "monthly") {
        const now = new Date()
        for (let i = 0; i < 12; i++) {
          const year = now.getFullYear() + Math.floor((now.getMonth() + i) / 12)
          const month = (now.getMonth() + i) % 12
          const targetDate = endOfMonth(new Date(year, month))

          await createNotification({
            year: getYear(targetDate),
            month: getMonth(targetDate) + 1,
            day: getDate(targetDate),
            hour,
            minute,
            repeats: false,
          })
        }
      } else if (Array.isArray(frequency)) {
        for (const day of frequency) {
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

  return { schedule, cancel, requestPermissions, scheduledReminders }
}
