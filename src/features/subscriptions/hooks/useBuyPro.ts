import RevenueCatUI from "react-native-purchases-ui"
import { useMutate } from "@/api/hooks/useMutate"
import { showToast } from "@/utils/showToast"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useBuyPro = (
  {
    paywallIdentifier,
  }: {
    paywallIdentifier?:
      | "freemium1/main"
      | "freemium1/premium-feature"
      | "freemium1/habit-limit"
      | "freemium1/rewards-limit"
  } = { paywallIdentifier: "freemium1/main" },
) => {
  const queryClient = useQueryClient()

  const { create: addSubscription, isPending: isAddingToDb } = useMutate({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.subscription.get,
      })
    },
    onError: () => {
      // Log to the database that there was an error while buying the subscription
      showToast({
        type: "error",
        message: "Something went wrong, try again later",
      })
    },
    endpoint: "/subscriptions",
  })

  const showPaywall = () => {
    return RevenueCatUI.presentPaywall({
      //@ts-expect-error - offering needs all default values to be passed for no reason
      offering: { identifier: paywallIdentifier },
      displayCloseButton: true,
    })
  }

  const buyPro = async () => {
    const paywallResult = await showPaywall()
    if (paywallResult === "PURCHASED") addSubscription({})
    else if (paywallResult === "ERROR") {
      //todo - Log to the database that there was an error while buying the subscription (RevenueCat)
      showToast({
        type: "error",
        message: "Something went wrong, try again later",
      })
    }
  }

  // Check if the info about subscription is still refetching
  const isRefetching =
    queryClient.getQueryState(queryKeys.subscription.get)?.status === "pending"

  const isLoading = isRefetching || isAddingToDb
  return { buyPro, isLoading }
}
