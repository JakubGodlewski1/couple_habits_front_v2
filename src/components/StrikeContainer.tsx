import { View, Text } from "react-native"

const StrikeContainer = ({ strike }: { strike: number }) => {
  return (
    <View className="mx-4 rounded-l-main justify-center">
      <Text className="text-center">Strike:</Text>
      <Text className="text-center font-main800 text-[18px]">
        {strike} days
      </Text>
    </View>
  )
}

export default StrikeContainer
