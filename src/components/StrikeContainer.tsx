import { View, Text } from "react-native"

const StrikeContainer = ({ strike }: { strike: number }) => {
  return (
    <View className=" rounded-l-main justify-center pr-5 bg-white border-y-[1px] border-gray-100">
      <Text className="text-center text-sm">Strike:</Text>
      <Text className="text-center font-semibold text-[15px]">
        {strike} days
      </Text>
    </View>
  )
}

export default StrikeContainer
