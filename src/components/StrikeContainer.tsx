import { View, Text } from "react-native"

const StrikeContainer = ({ strike }: { strike: number }) => {
  return (
    <View className=" justify-center  bg-white border-y-[1px] border-gray-100 w-20  items-center">
      <Text className="text-center text-sm">Strike:</Text>
      <Text className="text-center font-semibold text-[15px]">
        {strike} days
      </Text>
    </View>
  )
}

export default StrikeContainer
