import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import { ReactNode } from "react"
import Text from "./Text"
import { vibrate } from "@/utils/vibrate"

type BtnType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "subtle"
  | "white"
  | "error"
  | "success"
  | "gold"

type Props = {
  size?: "sm" | "normal"
  isLoading?: boolean
  testID?: string
  disabled?: boolean
  type?: BtnType
  onPress: () => void
  children?: ReactNode
  iconPosition?: "left" | "right"
  title: string | undefined
  classNames?: {
    wrapper?: string
    text?: string
  }
}

const typeStylesMap: Record<
  BtnType,
  { bg: string; text: string; border?: string }
> = {
  primary: {
    bg: "bg-primary",
    text: "text-white",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-white",
  },
  tertiary: {
    bg: "bg-tertiary",
    text: "text-white",
  },
  subtle: {
    bg: "bg-subtle",
    text: "text-black",
  },
  white: {
    border: "border-main",
    bg: "bg-white",
    text: "text:black",
  },
  error: {
    bg: "bg-white",
    text: "text-primary",
    border: "border-[1px] border-[#ff786f]",
  },
  success: {
    bg: "bg-white",
    text: "text-green-600",
    border: "border-[1px] border-green-600",
  },
  gold: {
    bg: "bg-white",
    text: "text-green-600",
    border: "border-[1px] border-[#FFD700]",
  },
}

export default function Button({
  size,
  isLoading = false,
  testID,
  children,
  iconPosition = "left",
  title,
  onPress,
  classNames,
  type = "secondary",
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      testID={testID}
      disabled={disabled}
      onPress={() => {
        vibrate()
        onPress()
      }}
      style={{ opacity: disabled ? 0.6 : 1 }}
      className={`items-center justify-center gap-2 rounded-main ${size === "sm" ? "p-3" : "p-4"} 
      ${iconPosition === "right" ? "flex-row" : "flex-row-reverse"}
      ${typeStylesMap[type].bg} 
      ${typeStylesMap[type]?.border}
      ${classNames?.wrapper} `}
    >
      <Text
        className={`font-main800 ${typeStylesMap[type].text} ${classNames?.text}`}
      >
        {isLoading || !title ? <ActivityIndicator /> : title}
      </Text>
      {children && <View className="-mt-0.5">{children}</View>}
    </TouchableOpacity>
  )
}
