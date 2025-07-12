import { Image } from "react-native"
import SafeAreaWrapper from "@/components/SafeAreaWrapper"
import logo from "@/assets/icons/iconSplash.png"

export default function IsLoadingLogo() {
  return (
    <SafeAreaWrapper className="items-center justify-center">
      <Image className="h-[122px] w-[192px]" source={logo} />
    </SafeAreaWrapper>
  )
}
