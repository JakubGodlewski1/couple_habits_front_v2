import StatsBar from "@/components/StatsBar"
import { showToast } from "@/utils/showToast"
import { useGetStats } from "@/features/stats/api/hooks/useGetStats"

export default function HomeStatsBar(
  { isDisabled }: { isDisabled?: boolean } = { isDisabled: false },
) {
  const { stats, isError } = useGetStats({
    isDisabled,
  })

  if (isError) {
    showToast({
      type: "error",
      message: "We could not get your stats data.",
      extraMessage: "Try again later.",
    })
  }

  return <StatsBar strike={stats?.strike} points={stats?.points} />
}
