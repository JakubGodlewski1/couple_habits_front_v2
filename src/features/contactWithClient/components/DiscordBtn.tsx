import Button from "@/components/Button"
import { Image, Linking } from "react-native"
import discord from "@/assets/icons/disord.png"
import { showToast } from "@/utils/showToast"
import { useState } from "react"

const DiscordBtn = () => {
  const discordInvite = "https://discord.gg/ThcRMgRZuW"
  const [isLoading, setIsLoading] = useState(false)

  const openDiscord = async () => {
    setIsLoading(true)

    await Linking.openURL(discordInvite)
      .catch((err) => {
        console.error("Failed to open Discord link", err)
        showToast({
          type: "error",
          message: "Something went wrong",
          extraMessage: "We could not open the link",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Button
      disabled={isLoading}
      classNames={{
        wrapper: "flex-row justify-between",
      }}
      iconPosition="right"
      type="white"
      onPress={openDiscord}
      title="Discord"
    >
      <Image className="w-8 h-7" source={discord} />
    </Button>
  )
}

export default DiscordBtn
