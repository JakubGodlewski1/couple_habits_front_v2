import { mockHabits } from "../../../../mocks/habits.mock"
import { habitFilters } from "../../../../../src/features/habits/filters/filters"

describe("filters", () => {
  const {
    dailyUncompleted,
    dailyCompleted,
    weeklyCompleted,
    weeklyUncompleted,
    specificDaysUncompleted,
    specificDaysCompleted,
  } = mockHabits

  const habits = [
    ...dailyUncompleted,
    ...dailyCompleted,
    ...weeklyCompleted,
    ...weeklyUncompleted,
    ...specificDaysUncompleted,
    ...specificDaysCompleted,
  ]

  const { daily, scheduledForToday, weekly, specificDays } = habitFilters

  describe("daily", () => {
    const dailyHabits = habits.filter(daily)

    it(" ALL - should return habits that are supposed to be done daily", () => {
      expect(dailyHabits.length).toBe(6)
    })

    it("UNCOMPLETED - should return habits that are supposed to be done daily uncompleted", () => {
      expect(dailyHabits.filter(uncompleted).length).toBe(3)
    })

    it("COMPLETED - should return habits that are supposed to be done daily completed", () => {
      expect(dailyHabits.filter(completed).length).toBe(3)
    })
  })

  describe("weekly", () => {
    const weeklyHabits = habits.filter(weekly)

    it(" ALL - should return habits that are supposed to be done weekly", () => {
      expect(weeklyHabits.length).toBe(6)
      weeklyHabits.forEach((h) => {
        expect(h.frequency).toMatchObject({
          type: "repeat",
          value: "weekly",
        })
      })
    })

    it("UNCOMPLETED - should return habits that are supposed to be done weekly uncompleted", () => {
      expect(weeklyHabits.filter(uncompleted).length).toBe(3)
    })

    it("COMPLETED - should return habits that are supposed to be done weekly completed", () => {
      expect(weeklyHabits.filter(completed).length).toBe(3)
    })
  })

  describe("specific days", () => {
    const specificDaysHabits = habits.filter(specificDays)

    it(" ALL - should return habits that are supposed to be done during specific days", () => {
      expect(specificDaysHabits.length).toBe(6)
      specificDaysHabits.forEach((h) => {
        expect(h.frequency).toMatchObject({ type: "specificDays" })
      })
    })

    it("UNCOMPLETED - should return habits that are supposed to be done during specific days uncompleted", () => {
      expect(specificDaysHabits.filter(uncompleted).length).toBe(3)
    })

    it("COMPLETED - should return habits that are supposed to be done during specific days completed", () => {
      expect(specificDaysHabits.filter(completed).length).toBe(3)
    })
  })

  describe("return habits scheduled for today", () => {
    it("should return 12 habits if today is monday", () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date("2024-11-25T10:00:00.000Z").getTime()) //monday
      expect(habits.filter(scheduledForToday).length).toBe(12)
    })

    it("should return 6 habits if today is thursday", () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date("2024-11-28T10:00:00.000Z").getTime()) //thursday
      expect(habits.filter(scheduledForToday).length).toBe(6)
    })

    jest.useRealTimers() // Restore real timers after tests
  })
})
