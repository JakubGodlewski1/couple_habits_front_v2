import { Keyboard, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import Text from "./Text"
import { Entypo } from "@expo/vector-icons"

type Props<T extends string> = {
  value: T
  onChange: (key: T) => void
  options: {
    key: T
    label: string
  }[]
}

export default function Dropdown<T extends string>({
  options,
  onChange,
  value,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((el) => el.key === value)

  if (!selected) {
    return null
  }

  return (
    <View className="relative z-10">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Keyboard.dismiss()
          setIsOpen((p) => !p)
        }}
        className="p-4 flex-row items-center justify-between rounded-main border-main bg-white"
      >
        <Text>{selected.label}</Text>
        <Entypo
          color="#828282"
          size={24}
          name={isOpen ? "chevron-small-up" : "chevron-small-down"}
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="z-10 bg-white mt-1 p-2 absolute top-14 w-full border-main rounded-main">
          {options.map((o) => (
            <TouchableOpacity
              className={`flex-row justify-between items-center rounded-lg py-2 px-3 ${selected.key === o.key && "bg-[#FF5545]"}`}
              key={o.key}
              onPress={() => {
                onChange(o.key)
                setIsOpen(false)
              }}
            >
              <Text
                className={`${selected.key === o.key && "text-white font-mainBold"}`}
              >
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
