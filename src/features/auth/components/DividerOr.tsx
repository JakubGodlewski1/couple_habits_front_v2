import { View, Text } from "react-native"

type Props = {
  className?: string
}

export default function DividerOr({ className }: Props) {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <View className="border-t-[0.7px] border-tertiary grow mr-5" />
      <Text>or</Text>
      <View className="border-t-[0.7px] border-tertiary grow ml-5" />
    </View>
  )
}
