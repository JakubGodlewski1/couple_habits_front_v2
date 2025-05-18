const setFakeTime = (date: string) =>
  jest.useFakeTimers().setSystemTime(new Date(date).getTime())

afterAll(() => {
  jest.useRealTimers()
})

describe("filteredHabits", () => {
  // const {
  //   dailyUncompleted,
  //   dailyCompleted,
  //   weeklyCompleted,
  //   weeklyUncompleted,
  //   specificDaysUncompleted,
  //   specificDaysCompleted,
  // } = mockHabits

  // const habits = [
  //   dailyUncompleted[0],
  //   dailyUncompleted[1],
  //   dailyCompleted[0],
  //
  //   weeklyUncompleted[0],
  //   weeklyCompleted[0],
  //   weeklyCompleted[1],
  //   weeklyCompleted[2],
  //
  //   specificDaysUncompleted[0],
  //   specificDaysUncompleted[1],
  //   specificDaysCompleted[0],
  //   specificDaysCompleted[1],
  //   specificDaysCompleted[2],
  // ]

  describe("TODO", () => {
    it("should return 5 habits if today is monday ", () => {
      setFakeTime("2024-11-25T00:00:00.000Z") //monday
    })

    it("should return 5 habits if today is sunday ", () => {
      setFakeTime("2024-11-24T00:00:00.000Z") //sunday
    })

    it("should return 4 habits if today is thursday ", () => {
      setFakeTime("2024-11-28T00:00:00.000Z") //thursday
    })
  })
})
