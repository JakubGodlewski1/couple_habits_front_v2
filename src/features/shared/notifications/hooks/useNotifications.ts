import { useCallback, useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import { SchedulableTriggerInputTypes } from "expo-notifications"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { endOfMonth, getDate } from "date-fns"

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
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      })
    }
  }, [])

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

        if (Platform.OS === "android" && trigger && "type" in trigger) {
          if (trigger.type === "date" && "value" in trigger) {
            const date = new Date(trigger.value as number)

            const hour = date.getHours()
            const minute = date.getMinutes()

            result.push({
              id: habitId,
              hour,
              minute,
            })
          } else if ("hour" in trigger && "minute" in trigger) {
            result.push({
              id: habitId,
              hour: trigger.hour!,
              minute: trigger.minute!,
            })
          }
        }

        if (Platform.OS === "ios") {
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
      }

      setScheduledReminders(result)
    }

    loadReminderInfo()
  }, [])

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      })
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()

    if (existingStatus === "granted") return { status: "granted" }
    if (Platform.OS === "ios" && existingStatus === "denied")
      return { status: "denied" }

    const { status } = await Notifications.requestPermissionsAsync()

    return { status }
  }, [])

  const schedule = useCallback(
    async ({ id, frequency, hour, minute, title, body }: ScheduleInput) => {
      await requestPermissions()
      await cancel(id)

      const notificationIds: string[] = []

      const createNotification = async (trigger: any) => {
        try {
          const nid = await Notifications.scheduleNotificationAsync({
            content: {
              title,
              body,
            },
            trigger:
              Platform.OS === "android"
                ? {
                    ...trigger,
                    channelId: "default",
                  }
                : {
                    ...trigger,
                  },
          })

          notificationIds.push(nid)
        } catch (err) {
          console.error("Failed to schedule notification", err)
        }
      }

      if (frequency === "daily") {
        await createNotification({ hour, minute, repeats: true, type: "daily" })
      } else if (frequency === "weekly") {
        await createNotification({
          weekday: 1,
          hour,
          minute,
          repeats: true,
          type: Platform.OS === "android" ? "weekly" : "calendar",
        }) // Sunday
      } else if (frequency === "monthly") {
        const now = new Date()
        for (let i = 0; i < 12; i++) {
          const year = now.getFullYear() + Math.floor((now.getMonth() + i) / 12)
          const month = (now.getMonth() + i) % 12
          const day = Math.min(28, getDate(endOfMonth(new Date(year, month))))
          const date = new Date(year, month, day, hour, minute)

          const iosTrigger = {
            type: SchedulableTriggerInputTypes.CALENDAR,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
          }

          const androidTrigger = {
            date,
            type: SchedulableTriggerInputTypes.DATE,
          }

          const nid = await Notifications.scheduleNotificationAsync({
            content: { title, body },
            trigger: (Platform.OS === "android"
              ? androidTrigger
              : iosTrigger) as any,
          })

          notificationIds.push(nid)
        }
      } else if (Array.isArray(frequency)) {
        for (const day of frequency) {
          const expoWeekday = (day + 1) % 7 || 7

          try {
            await createNotification({
              weekday: expoWeekday,
              hour,
              minute,
              repeats: true,
              type: Platform.OS === "android" ? "weekly" : "calendar",
            })
          } catch (err) {
            console.log({ err })
          }
        }
      }

      await AsyncStorage.setItem(
        STORAGE_KEY_PREFIX + id.toString(),
        JSON.stringify(notificationIds),
      )
    },
    [requestPermissions],
  )

  const cancel = useCallback(async (id: string | number) => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PREFIX + id.toString())
    if (!raw) return

    const ids: string[] = JSON.parse(raw)

    for (const nid of ids) {
      try {
        await Notifications.cancelScheduledNotificationAsync(nid)
        await AsyncStorage.removeItem(STORAGE_KEY_PREFIX + id.toString())
      } catch (e) {
        console.warn(`Failed to cancel notification ${nid}`, e)
      }
    }
  }, [])

  return { schedule, cancel, requestPermissions, scheduledReminders }
}
