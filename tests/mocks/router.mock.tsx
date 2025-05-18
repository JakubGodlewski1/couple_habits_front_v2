import Hero from "../../src/app/(unauthorized)/hero"
import AuthLayout from "../../src/app/(unauthorized)/_layout"
import RootLayout from "../../src/app/_layout"
import SignIn from "../../src/app/(unauthorized)/sign-in"
import SignUp from "../../src/app/(unauthorized)/sign-up"
import TutorialLayout from "../../src/app/(authorized)/(tutorial)/_layout"
import HowToPlay from "../../src/app/(authorized)/(tutorial)/how-to-play"
import CardDetails from "../../src/app/(authorized)/(tutorial)/card-details"
import MainLayout from "../../src/app/(authorized)/(main)/_layout"
import AddHabit from "../../src/app/(authorized)/(main)/add-habit"
import Settings from "../../src/app/(authorized)/(main)/settings"
import Home from "../../src/app/(authorized)/(main)/(home)/home"
import Ideas from "../../src/app/(authorized)/(main)/ideas"
import AddPartner from "../../src/app/(authorized)/(main)/(home)/add-partner"
import HomeLayout from "../../src/app/(authorized)/(main)/(home)/_layout"

export const routerMock = {
  _layout: () => <RootLayout />,
  "(unauthorized)/_layout": () => <AuthLayout />,
  "(unauthorized)/sign-in": () => <SignIn />,
  "(unauthorized)/sign-up": () => <SignUp />,
  "(unauthorized)/hero": () => <Hero />,
  "(tutorial)/_layout": () => <TutorialLayout />,
  "(tutorial)/how-to-play": () => <HowToPlay />,
  "(tutorial)/card-details": () => <CardDetails />,
  "(main)/_layout": () => <MainLayout />,
  "(main)/add-habit": () => <AddHabit />,
  "(main)/settings": () => <Settings />,
  "(main)/(home)/_layout": () => <HomeLayout />,
  "(main)/(home)/home": () => <Home />,
  "(main)/(home)/add-partner": () => <AddPartner />,
  "(main)/ideas": () => <Ideas />,
}
