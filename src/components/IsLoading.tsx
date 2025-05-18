import { ActivityIndicator } from "react-native"

export default function IsLoading() {
  return (
    <ActivityIndicator
      className="absolute top-1/2 left-1/2 -translate-x-5 -translate-y-3"
      size="large"
    />
  )
}
