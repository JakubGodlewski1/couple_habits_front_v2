import BouncyCheckbox from "react-native-bouncy-checkbox"
import { vibrate } from "@/utils/vibrate"

type Props = {
  disabled?: boolean
  onPress: (checked: boolean) => void
  isChecked: boolean
  className?: string
  color?: "green" | "red"
}

export default function Checkbox({
  disabled,
  onPress,
  isChecked,
  className,
  color = "green",
}: Props) {
  const colorHash = color === "red" ? "#ff786f" : "#D1D1D1"

  return (
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
    />
  )
}
