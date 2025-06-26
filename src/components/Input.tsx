import {
  KeyboardTypeOptions,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useState } from "react"
import Text from "./Text"
import { vibrate } from "@/utils/vibrate"

type Props = {
  placeholder?: string
  value: string
  onChangeText: (value: string) => void
  className?: string
  label?: string
  errorMessage?: string
  autoCapitalize?: "none" | "words" | "sentences"
  keyboardType?: KeyboardTypeOptions
  multiline?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

export default function Input({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  className,
  errorMessage,
  multiline,
  autoCapitalize = "sentences",
  label,
  onFocus,
  onBlur,
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  return (
    <View className={className}>
      {label && <Text>{label}</Text>}
      <View
        className={`flex-row bg-white border-[1px] border-subtle rounded-main items-center pr-4 overflow-hidden`}
      >
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          className={`p-4 grow font-main700 ${multiline ? "h-48" : ""}`}
          autoCapitalize={autoCapitalize}
          secureTextEntry={
            !passwordVisible && keyboardType === "visible-password"
          }
          returnKeyType="done"
          keyboardType={Platform.OS === "android" ? "default" : keyboardType}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          placeholderTextColor="#828282"
          placeholder={placeholder}
        />

        {keyboardType === "visible-password" && (
          <>
            {
              <TouchableOpacity
                onPress={() => {
                  vibrate()
                  setPasswordVisible((p) => !p)
                }}
              >
                {passwordVisible ? (
                  <Entypo size={24} name="eye-with-line" />
                ) : (
                  <Entypo size={24} name="eye" />
                )}
              </TouchableOpacity>
            }
          </>
        )}
      </View>
      {errorMessage && (
        <Text className="mt-2 font-main700 text-error">{errorMessage}</Text>
      )}
    </View>
  )
}
