import Button from "@/components/Button"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useUploadPartnerAvatar } from "@/features/avatar/api/hooks/useUploadPartnerAvatar"

export default function ChangePartnerAvatarBtn() {
  const { uploadPartnerAvatar, isPending } = useUploadPartnerAvatar()

  return (
    <Button
      disabled={isPending}
      classNames={{ wrapper: "justify-between" }}
      iconPosition="right"
      type="white"
      onPress={uploadPartnerAvatar}
      title="Change partner's profile picture"
    >
      <MaterialCommunityIcons size={26} name="face-man-shimmer-outline" />
    </Button>
  )
}
