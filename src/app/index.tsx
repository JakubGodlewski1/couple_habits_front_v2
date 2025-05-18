import { useEffect } from "react"
import { router } from "expo-router"

export default function RootPage() {
  //redirect from root page to hero section

  useEffect(() => {
    setTimeout(() => {
      router.push("/hero")
    }, 0)
  }, [])
}
