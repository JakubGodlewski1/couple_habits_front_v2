import BouncyCheckbox from "react-native-bouncy-checkbox"

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
  const colorHash = color === "red" ? "#ff786f" : "#6EC166"

  return (
    <BouncyCheckbox
      useBuiltInState={false}
      disabled={disabled}
      className={`p-2.5 -m-2.5 ${className}`}
      fillColor={colorHash}
      isChecked={isChecked}
      onPress={() => {
        if (disabled) return
        onPress(!isChecked)
      }}
      size={20}
      innerIconStyle={{
        borderRadius: 4,
        borderColor: isChecked ? colorHash : "black",
      }}
      iconStyle={{ borderRadius: 4 }}
    />
  )
}
