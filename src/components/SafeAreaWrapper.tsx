import { SafeAreaView } from "react-native-safe-area-context"
import { ReactNode } from "react"

export default function SafeAreaWrapper({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <SafeAreaView className={`p-2 bg-gray-50 flex-grow ${className}`}>
      {children}
    </SafeAreaView>
  )
}
