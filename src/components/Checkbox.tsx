import BouncyCheckbox from "react-native-bouncy-checkbox"
import { vibrate } from "@/utils/vibrate"
import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import Text from "@/components/Text"

type Props = {
  disabled?: boolean
  onPress: (checked: boolean) => void
  isChecked: boolean
  className?: string
  color?: "green" | "red"
  children?: ReactNode
  innerValue?: number | string | null
}

export default function Checkbox({
  disabled,
  onPress,
  isChecked,
  className,
  children,
  color = "green",
  innerValue,
}: Props) {
  const colorHash = color === "red" ? "#ff786f" : "#D1D1D1"

  return (
    <>
      <BouncyCheckbox
        useBuiltInState={false}
        disabled={disabled}
        className={`p-2.5 -m-2.5 max-w-12 ${className}`}
        fillColor={colorHash}
        isChecked={isChecked}
        onPress={() => {
          vibrate()
          if (disabled) return
          onPress(!isChecked)
        }}
        size={20}
        innerIconStyle={{
          borderRadius: 4,
          borderColor: isChecked ? colorHash : "gray",
        }}
        iconStyle={{ borderRadius: 4 }}
        iconComponent={
          innerValue ? (
            <Text className="mb-1.5 text-[20px]">{innerValue}</Text>
          ) : undefined
        }
      />
      {children && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            vibrate()
            onPress(!isChecked)
          }}
        >
          <Text type="sm">{children}</Text>
        </TouchableOpacity>
      )}
    </>
  )
}
