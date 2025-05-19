import { useAxios } from "@/api/hooks/useAxios"
import { HabitFromBackend } from "@/features/habits/types/habitCard"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"
import { HabitsFromBackend } from "@/features/habits/types/habit"

const fakeHabits: HabitsFromBackend = {
  user: [
    {
      id: 1,
      label: "Morning meditation",
      strike: 5,
      isCompleted: false,
      frequency: {
        type: "repeat",
        value: "daily",
      },
    },
    {
      id: 2,
      label: "Workout",
      strike: 3,
      isCompleted: true,
      frequency: {
        type: "specificDays",
        value: ["monday", "wednesday", "friday"],
      },
    },
    {
      id: 3,
      label: "Read a book",
      strike: 10,
      isCompleted: true,
      frequency: {
        type: "repeat",
        value: "daily",
      },
    },
    {
      id: 4,
      label: "Call parents",
      strike: 2,
      isCompleted: false,
      frequency: {
        type: "specificDays",
        value: ["sunday"],
      },
    },
  ],
  partner: [
    {
      id: 5,
      label: "Water the plants",
      strike: 1,
      isCompleted: false,
      frequency: {
        type: "specificDays",
        value: ["tuesday", "saturday"],
      },
    },
    {
      id: 6,
      label: "Stretching",
      strike: 7,
      isCompleted: true,
      frequency: {
        type: "repeat",
        value: "daily",
      },
    },
    {
      id: 7,
      label: "Clean the kitchen",
      strike: 4,
      isCompleted: false,
      frequency: {
        type: "specificDays",
        value: ["friday"],
      },
    },
    {
      id: 8,
      label: "Weekly review",
      strike: 6,
      isCompleted: true,
      frequency: {
        type: "specificDays",
        value: ["sunday"],
      },
    },
    {
      id: 9,
      label: "Write in journal",
      strike: 9,
      isCompleted: false,
      frequency: {
        type: "repeat",
        value: "daily",
      },
    },
    {
      id: 10,
      label: "Go for a run",
      strike: 2,
      isCompleted: false,
      frequency: {
        type: "specificDays",
        value: ["monday", "thursday"],
      },
    },
  ],
}

export const useGetHabits = () => {
  const { getAxiosInstance } = useAxios()

  const getHabits = async () => {
    return fakeHabits

    const axios = await getAxiosInstance()
    const res = await axios.get("/habits")
    return await res.data
  }

  const { data, isLoading, isError } = useQuery<HabitsFromBackend>({
    queryKey: queryKeys.habits.get,
    queryFn: getHabits,
  })

  return { data, isError, isLoading }
}
