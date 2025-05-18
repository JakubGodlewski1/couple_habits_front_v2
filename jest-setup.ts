import "@testing-library/jest-native/extend-expect"

import path from "path"
import dotenv from "dotenv"
import { ReactNode } from "react"
dotenv.config({ path: path.resolve(__dirname, ".env.test") })

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
    useAuth: () => ({
      isSignedIn: false,
      isLoaded: true,
      userId: "mock-user-id",
      sessionId: "mock-session-id",
      getToken: jest.fn().mockResolvedValue("mock-token"),
    }),
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

jest.mock("@expo/vector-icons", () => {
  const MockComponent = () => null
  return new Proxy(
    {},
    {
      get: () => MockComponent, // Mock all exports with the same component
    },
  )
})
