import { PropsWithChildren, useCallback, useState } from "react"
import { useFocusEffect } from "expo-router"

export default function UnmountOnBlur({ children }: PropsWithChildren) {
  //unmount the form when navigating to another screen
  const [shouldHide, setShouldHide] = useState(false)
  useFocusEffect(
    useCallback(() => {
      setShouldHide(false)
      return () => setShouldHide(true)
    }, []),
  )

  return shouldHide ? null : children
}
