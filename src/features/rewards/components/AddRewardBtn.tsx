import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useState } from "react"
import RewardForm from "@/features/rewards/forms/RewardForm"
import { Alert, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import { useGetHabits } from "@/features/habits/api/hooks/useGetHabits"
import { useSecureMaxRewardsForFreemium } from "@/features/rewards/hooks/useSecureMaxRewardsForFreemium"

type Props = {
  setTab: (tab: RewardsMainTabsKey) => void
  type?: "initial" | "standard"
}

export default function AddRewardBtn({ type = "initial", setTab }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useGetUser().user!
  const { data } = useGetHabits()
  const { callIfAllowed, isLoading } = useSecureMaxRewardsForFreemium()

  const onOpen = () => {
    if (!user.hasPartner) {
      Alert.alert(
        `Connect with ${user.partnerName} first`,
        `You have to connect with ${user.partnerName} before creating your first reward.`,
      )
    } else if (data?.user.length === 0 || data?.partner.length === 0) {
      Alert.alert(
        `Create a few habits with ${user.partnerName} first`,
        `We calculate reward prices based on the number of habits you and ${user.partnerName} have`,
      )
    } else setIsModalOpen(true)
  }

  return (
    <>
      {type === "initial" ? (
        <Button
          disabled={isLoading}
          classNames={{
            wrapper: "mx-auto mt-5 py-3",
          }}
          onPress={() => callIfAllowed(onOpen)}
          title="Add your first reward"
        />
      ) : (
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => callIfAllowed(onOpen)}
          className="border-[1px] bg-white border-primary rounded-lg p-1 items-center mb-2 grow"
        >
          <AntDesign name="plus" size={24} color="#ff786f" />
        </TouchableOpacity>
      )}

      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <RewardForm
          moveToStoreTab={() => setTab("store")}
          onCloseModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}
