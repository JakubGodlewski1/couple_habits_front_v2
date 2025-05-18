import Button from "@/components/Button"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useUploadAvatar } from "@/features/avatar/api/hooks/useUploadAvatar"

export default function ChangeAvatarBtn() {
  const { uploadAvatar, isPending } = useUploadAvatar()

  return (
    <Button
      disabled={isPending}
      classNames={{ wrapper: "justify-between" }}
      iconPosition="right"
      type="white"
      onPress={uploadAvatar}
      title="Change profile picture"
    >
      <MaterialCommunityIcons size={24} name="face-man-shimmer-outline" />
    </Button>
  )
}
