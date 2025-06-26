import { TouchableOpacity, View } from "react-native"
import Text from "./Text"
import { vibrate } from "@/utils/vibrate"

type Option<T extends string> = {
  key: T
  label: string
}

type Props<T extends string> = {
  options: Option<T>[]
  onChange: (key: T) => void
  value: T[]
  classNames?: {
    textSelected: string
    bgSelected: string
  }
}

export default function MultiSelect<T extends string>({
  options,
  onChange,
  value,
  classNames,
}: Props<T>) {
  return (
    <View className="flex-row gap-2 justify-evenly bg-white p-2 border-main rounded-main">
      {options.map((option) => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            vibrate()
            onChange(option.key)
          }}
          className={`grow justify-center rounded-lg py-2 ${value.includes(option.key) ? `bg-primary ${classNames?.bgSelected}` : ""}`}
          key={option.key}
        >
          <Text
            className={`text-center ${value.includes(option.key) ? `text-white font-mainBold ${classNames?.textSelected}` : "text-backgroundItem"}`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
