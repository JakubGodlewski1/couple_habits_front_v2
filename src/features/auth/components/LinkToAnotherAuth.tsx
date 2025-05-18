import { View } from "react-native"
import { Link } from "expo-router"
import Text from "../../../components/Text"

export default function LinkToAnotherAuth({
  href,
  isDisabled = false,
}: {
  isDisabled?: boolean
  href: "/sign-in" | "/sign-up"
}) {
  return (
    <View className="self-end mr-2 mt-auto">
      <Text className="text-center">
        {href === "/sign-in"
          ? "Already have an account? Let's"
          : "Don't have an account yet? Let's"}
        <Link
          disabled={isDisabled}
          push
          className="text-primary font-main800"
          href={href}
        >
          {" "}
          {href === "/sign-in" ? "sign in" : "sign up"}
        </Link>
      </Text>
    </View>
  )
}
