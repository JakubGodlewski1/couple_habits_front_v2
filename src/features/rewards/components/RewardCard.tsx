import { View, Image, TouchableOpacity } from "react-native"
import Button from "@/components/Button"
import Text from "@/components/Text"
import { useBuyOrUseReward } from "@/features/rewards/api/hooks/useBuyOrUseReward"
import { useGetStats } from "@/features/stats/api/hooks/useGetStats"
import RewardForm from "@/features/rewards/forms/RewardForm"
import Modal from "@/components/Modal"
import { useState } from "react"

type Props = {
  reward: RewardFromBackend
  moveToPurchasedTab: () => void
}

export default function RewardCard({ reward, moveToPurchasedTab }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { imageUrl, label, price, id, tab } = reward

  const state = !("isUsed" in reward)
    ? "created"
    : reward.isUsed
      ? "used"
      : "purchased"

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="shadow-sm bg-white rounded-xl"
      >
        <View className="h-28">
          <Image
            className="w-full h-full flex-1 rounded-t-xl"
            source={{ uri: imageUrl }}
          />
        </View>
        <View className="p-3 gap-2">
          <Text type="sm" className="font-main600">
            {label}
          </Text>
          <Text type="h3" className="font-main800 text-primary">
            {price} points
          </Text>
          <StateButton
            moveToPurchasedTab={moveToPurchasedTab}
            price={price}
            id={id}
            state={state}
          />
        </View>
      </TouchableOpacity>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <RewardForm
          defaultValues={{ price, label, imageUrl, tab }}
          id={id}
          onCloseModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}

const StateButton = ({
  state,
  id,
  price,
  moveToPurchasedTab,
}: {
  moveToPurchasedTab: () => void
  state: "created" | "purchased" | "used"
  id: number
  price: number
}) => {
  const { update, isPending } = useBuyOrUseReward({
    onSettled: () => {
      if (state === "created") {
        moveToPurchasedTab()
      }
    },
  })

  const { stats } = useGetStats()

  const isBtnDisabled =
    isPending ||
    state === "used" ||
    (state === "created" &&
      stats?.points !== undefined &&
      stats?.points < price)

  return (
    <Button
      disabled={isBtnDisabled}
      classNames={{
        wrapper: "py-2.5",
      }}
      onPress={() =>
        update({ id, action: state === "created" ? "buy" : "use" })
      }
      title={
        state === "created"
          ? "Buy now"
          : state === "purchased"
            ? "Use"
            : "Reward used"
      }
    />
  )
}
