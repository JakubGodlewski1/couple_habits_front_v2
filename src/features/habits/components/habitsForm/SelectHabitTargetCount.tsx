import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  Text as RNText,
} from "react-native"
import { useState } from "react"
import { vibrate } from "@/utils/vibrate"
import { Picker } from "@react-native-picker/picker"
import Text from "@/components/Text"

type Props = {
  setAmount: (amount: number) => void
  amount: number
}

const items = Array.from({ length: 19 }, (_, i) => ({
  label: (i + 1).toString(),
  value: i + 1,
}))

// Native blue per platform
const nativeBlue = Platform.select({
  ios: "#007AFF",
  android: "#6200EE",
  default: "#007AFF",
})

export default function SelectHabitTargetCount({ amount, setAmount }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState(amount)

  return (
    <View className="flex">
      <TouchableOpacity
        onPress={() => {
          vibrate()
          setIsVisible(true)
        }}
        activeOpacity={0.7}
        className="bg-white border border-subtle rounded-main items-center px-5 p-4"
      >
        <Text>
          {amount} {amount === 1 ? "time" : "times"}
        </Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setIsVisible(false)}
          className="flex-1 bg-black/50 justify-end items-center px-4 pb-10"
        >
          {/* Picker + Confirm block */}
          <Pressable
            onPress={() => {}}
            className="bg-white w-full max-w-[500px] rounded-xl overflow-hidden mb-2 pt-5 px-5"
          >
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={{ height: 200, width: "100%" }}
            >
              {items.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>

            {/* Delicate line */}
            <View className="h-[1px] bg-gray-100 w-full mt-2" />

            <TouchableOpacity
              onPress={() => {
                setAmount(selectedValue)
                setIsVisible(false)
              }}
              className="py-4 items-center bg-white"
            >
              <RNText className="text-2xl" style={{ color: nativeBlue }}>
                Confirm
              </RNText>
            </TouchableOpacity>
          </Pressable>

          {/* Cancel block */}
          <Pressable
            onPress={() => setIsVisible(false)}
            className="bg-white w-full max-w-[500px] rounded-xl py-4 items-center"
          >
            <RNText
              className="text-2xl font-semibold"
              style={{ color: nativeBlue }}
            >
              Cancel
            </RNText>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}
