import { Tabs } from "expo-router"
import TabBar from "../../../components/tabbar/Tabbar"
import { MainLayoutProviders } from "@/providers/MainLayoutProviders"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"
import PartnerRequestModal from "@/features/shared/partnerRequests/modals/PartnerRequestModal"
import TutorialRouter from "@/features/tutorial/components/shared/TutorialRouter"
import { useIconBadge } from "@/features/shared/notifications/hooks/useIconBudge"
// import { useTutorialContext } from "@/features/tutorial/contexts/tutorialContext"
// import { TouchableOpacity } from "react-native"

export default function MainLayoutWrapper() {
  return (
    <MainLayoutProviders>
      <MainLayout />
    </MainLayoutProviders>
  )
}

function MainLayout() {
  const user = useGetUser().user!
  useIconBadge()

  return (
    <>
      {/*<HandleTutorialReset />*/}
      <TutorialRouter />
      <PartnerRequestModal />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: "Rewards",
          }}
        />
        <Tabs.Screen
          listeners={({ navigation }) => ({
            // fix bug related to moving to add-partner after clicking home tab while being on home page
            tabPress: (e) => {
              e.preventDefault()

              // Navigate only if not already on the current route
              const state = navigation.getState()
              const currentRouteName = state.routes[state.index]?.name

              if (currentRouteName !== "(home)") {
                navigation.navigate("(home)", { owner: "user" })
              }
            },
          })}
          name="(home)"
          options={{
            title: "Home",
            href: "/home",
          }}
        />
        <Tabs.Screen
          name="partner-home"
          options={{
            title: `${user?.partnerName || "Partner"}`,
          }}
        />
      </Tabs>
    </>
  )
}

// const HandleTutorialReset = () => {
//   const { setTutorialSeen } = useTutorialContext()
//   return (
//     <TouchableOpacity
//       onPress={async () => {
//         // await setTutorialSeen("connection", false)
//         // await setTutorialSeen("firstHabit", false)
//         await setTutorialSeen("intro", false)
//         // await setTutorialSeen("partnerAvatar", false)
//         // await setTutorialSeen("discordInvite", false)
//       }}
//       className="bg-red-900 w-20 h-20 absolute z-50 bottom-32"
//     />
//   )
// }
