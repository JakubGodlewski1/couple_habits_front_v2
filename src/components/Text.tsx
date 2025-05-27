import { StyleProp, Text as NativeText, TextStyle } from "react-native"
import { ReactNode } from "react"

type TextType = "h1" | "h2" | "h3" | "span" | "sm"

type Props = {
  children: string | string[] | ReactNode
  className?: string
  type?: TextType
  style?: StyleProp<TextStyle>
}

const TextTypeMap: Record<TextType, string> = {
  h1: "text-[32px] font-main900 mb-8",
  h2: "text-3xl font-main800",
  h3: "text-2xl font-main700",
  span: "text-xl font-main600",
  sm: "text-lg font-main500",
}

export default function Text({
  children,
  className,
  type = "span",
  style,
}: Props) {
  return (
    <NativeText style={style} className={`${TextTypeMap[type]} ${className}`}>
      {children}
    </NativeText>
  )
}
