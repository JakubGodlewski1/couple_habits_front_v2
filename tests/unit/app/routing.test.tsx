import { renderRouter, userEvent } from "expo-router/testing-library"
import { screen } from "@testing-library/react-native"
import { routerMock } from "../../mocks/router.mock"
import { useAuth } from "@clerk/clerk-expo"
import { ReactNode } from "react"
jest.mock("@clerk/clerk-expo", () => {
  return {
    ClerkProvider: ({ children }: { children: ReactNode }) => {
      return children // Mock simply renders children
    },
    ClerkLoaded: ({ children }: { children: ReactNode }) => children,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "mock-user-id",
        email: "test@example.com",
      },
    }),
    useAuth: jest.fn(),
    useOAuth: jest.fn().mockReturnValue({
      startOAuthFlow: jest.fn(),
    }),
    useSignUp: jest.fn().mockReturnValue({
      signUp: jest.fn(),
      setActive: jest.fn(),
      isLoaded: true,
    }),
    useSignIn: jest.fn().mockReturnValue({
      signUp: jest.fn(),
      setActive: jest.fn(),
      isLoaded: true,
    }),
    useClerk: jest.fn().mockResolvedValue({
      signOut: jest.fn(),
    }),
  }
})

describe("Routing", () => {
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = "test-clerk-api-key"

  const setup = (initialUrl: string) => {
    const user = userEvent.setup()
    renderRouter(routerMock, { initialUrl })
    return { user }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("auth routing", () => {
    it("Should go from hero to sign up after clicking cta", async () => {
      ;(useAuth as jest.Mock).mockReturnValue({ isSignedIn: false })
      const { user } = setup("/(unauthorized)/hero")

      const btn = screen.getByText(/explore/i)
      await user.press(btn)
      expect(screen).toHavePathname("/sign-up")
    })

    it("Should go to sign up page from sign in page after clicking 'dont have an account yet...'", async () => {
      ;(useAuth as jest.Mock).mockReturnValue({ isSignedIn: false })

      const { user } = setup("/sign-in")
      const btn = screen.getByText(/sign up/i)
      await user.press(btn)
      expect(screen).toHavePathname("/sign-up")
    })

    it("Should go to sign in page from sign up page after clicking 'already have an account...'", async () => {
      ;(useAuth as jest.Mock).mockReturnValue({ isSignedIn: false })

      const { user } = setup("/sign-up")
      const btn = screen.getByText(/sign in/i)
      await user.press(btn)
      expect(screen).toHavePathname("/sign-in")
    })

    it("Should go to forgot page from sign in page after clicking 'forgot password?'", async () => {
      ;(useAuth as jest.Mock).mockReturnValue({ isSignedIn: false })

      const { user } = setup("/sign-in")
      const btn = screen.getByText(/forgot password/i)
      await user.press(btn)
      expect(screen).toHavePathname("/(unauthorized)/reset-password")
    })

    it.skip("should go to 'how to play' after clicking sign up on sign up page if proper sign up", async () => {
      const { user } = setup("/sign-up")
      const btn = screen.getByTestId(/sign-up-btn/i)
      await user.press(btn)
      expect(screen).toHavePathname("/how-to-play")
    })

    it.skip("should go to 'how to play' after clicking sign in on sign in page ", async () => {
      const { user } = setup("/sign-in")
      const btn = screen.getByTestId(/sign-in-btn/i)
      await user.press(btn)
      expect(screen).toHavePathname("/how-to-play")
    })
  })

  describe("tabs routing", () => {
    it("should go through all the tabs", async () => {
      ;(useAuth as jest.Mock).mockReturnValue({ isSignedIn: true })

      const { user } = setup("/settings")
      const settingsBtn = screen.getByTestId(/settings/i)
      const ideasBtn = screen.getByTestId(/ideas/i)
      const homeBtn = screen.getByTestId(/home/i)
      const addHabitBtn = screen.getByTestId(/add-habit/i)

      expect(screen).toHavePathname("/settings")

      await user.press(ideasBtn)
      expect(screen).toHavePathname("/ideas")

      await user.press(homeBtn)
      expect(screen).toHavePathname("/home")

      await user.press(addHabitBtn)
      expect(screen).toHavePathname("/add-habit")

      await user.press(settingsBtn)
      expect(screen).toHavePathname("/settings")
    })
  })

  // it("should go from home page to add partner page after clicking add partner btn", async () => {
  //   const { user } = setup("/(main)/home")
  //   const addPartnersBtn = screen.getByTestId(/add-partner/i)
  //   await user.press(addPartnersBtn)
  //   expect(screen).toHavePathname("/add-partner")
  // })
})
