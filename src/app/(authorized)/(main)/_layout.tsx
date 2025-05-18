import { Tabs } from "expo-router"
import TabBar from "../../../components/tabbar/Tabbar"
import { MainLayoutProviders } from "@/providers/MainLayoutProviders"
import PartnerRequestModal from "@/features/shared/partnerRequests/components/partnerRequestModal/PartnerRequestModal"
import { WaitForPartnerResponseModal } from "@/features/shared/partnerRequests/components/WaitForPartnerResponseModal"

export default function MainLayoutWrapper() {
  return (
    <MainLayoutProviders>
      <MainLayout />
    </MainLayoutProviders>
  )
}

function MainLayout() {
  return (
    <>
      <PartnerRequestModal />
      <WaitForPartnerResponseModal />
      <Tabs
        screenOptions={{
          animation: "shift",
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
          name="ideas"
          options={{
            title: "Ideas",
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
                navigation.navigate("(home)")
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
          name="add-habit"
          options={{
            title: "Add habit",
          }}
        />
      </Tabs>
    </>
  )
}
