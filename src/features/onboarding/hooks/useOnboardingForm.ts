import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingFormSchema } from "@/features/onboarding/schemas/onboardingFormSchema"
import { useMutate } from "@/api/hooks/useMutate"
import { router } from "expo-router"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/config/queryKeys"

export const useOnboardingForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OnboardingFlowFormType>({
    resolver: zodResolver(onboardingFormSchema),
  })

  const queryClient = useQueryClient()

  const { create, isPending } = useMutate({
    endpoint: "/onboarding",
    onSuccess: () => {
      //revalidate user query
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.get,
      })
    },
  })

  const onSubmit = (data: OnboardingFlowFormType) => {
    //set optimistic update for user's name
    queryClient.setQueryData(queryKeys.users.get, (prev: UserFromBackend) => ({
      ...prev,
      partnerName: getValues("partnerName"),
    }))
    create(data)
    router.push("/home")
  }

  return { control, isPending, errors, onSubmit: handleSubmit(onSubmit) }
}
