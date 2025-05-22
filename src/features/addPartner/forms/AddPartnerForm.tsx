import { View } from "react-native"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useAddPartnerForm } from "@/features/addPartner/hooks/useAddPartnerForm"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import IsLoading from "@/components/IsLoading"
import IsError from "@/components/IsError"

const AddPartnerForm = () => {
  const { user, isPending: isUserPending, error: userError } = useGetUser()

  const { connectionCode, onCodeChange, handleSubmit, error, isPending } =
    useAddPartnerForm()

  if (isUserPending) return <IsLoading />
  if (userError) return <IsError />

  return (
    <View className="gap-2">
      <Text className="text-center" type="h3">
        Enter the code from {user!.partnerName}
      </Text>
      <Input
        errorMessage={error || undefined}
        placeholder="3R1A2C"
        value={connectionCode}
        onChangeText={onCodeChange}
      />
      <Button
        disabled={isPending}
        onPress={handleSubmit}
        title={isPending ? "Connecting" : "Connect"}
      />
    </View>
  )
}

export default AddPartnerForm
