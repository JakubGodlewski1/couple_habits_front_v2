import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAxios } from "@/api/hooks/useAxios"
import { showToast } from "@/utils/showToast"

type Props<T> = {
  endpoint: string
  onSettled?: () => void
  onError?: (error: any) => void
  onSuccess?: () => void
  options?: {
    customMutations?: {
      update?: ({
        update,
        id,
      }: {
        id?: number
        update: Partial<T>
      }) => Promise<void>
      delete?: (id: number) => Promise<void>
      create?: (data: T) => Promise<void>
    }
    mutationKeys?: {
      create?: string[]
      update?: string[]
      delete?: string[]
    }
    queryKeysToInvalidate?: (string | number)[][]
  }
}

export const useMutate = <T>({
  endpoint,
  onError = () => {},
  onSuccess = () => {},
  onSettled = () => {},
  options,
}: Props<T>) => {
  const queryClient = useQueryClient()
  const { getAxiosInstance } = useAxios()

  /*api calls*/
  const updateMutation = async ({
    id = undefined,
    update,
  }: {
    id?: number
    update: Partial<T>
  }) => {
    const axios = await getAxiosInstance()
    const finalEndpoint = !id ? `${endpoint}` : `${endpoint}/${id}`
    const res = await axios.patch(finalEndpoint, update)
    return await res.data
  }

  const createMutation = async (data: T) => {
    const axios = await getAxiosInstance()
    const res = await axios.post(`${endpoint}`, data)
    return await res.data
  }

  const deleteMutation = async (id: number) => {
    const axios = await getAxiosInstance()
    const res = await axios.delete(`${endpoint}/${id}`)
    return await res.data
  }

  /*shared mutation "on" functions*/
  const on = {
    settled: async () => {
      onSettled()
      if (options?.queryKeysToInvalidate) {
        return options?.queryKeysToInvalidate.forEach((key) => {
          return queryClient.invalidateQueries({
            queryKey: key,
          })
        })
      } else
        queryClient.invalidateQueries({
          queryKey: [endpoint.substring(1)],
        })
    },
    success: onSuccess,
    error: (err: AxiosError<{ message?: string }>) => {
      let errorMessage: string = ""

      // Get the error message
      errorMessage = err.response?.data?.message || err.message

      showToast({
        type: "error",
        message: errorMessage,
      })
      onError(error)
    },
  }

  /*mutations*/

  //create mutation
  const {
    isPending: isCreating,
    mutate: create,
    error: createError,
  } = useMutation({
    mutationKey: options?.mutationKeys?.create || [
      `create-${endpoint.substring(1)}`,
    ],
    mutationFn: options?.customMutations?.create || createMutation,
    onError: on.error,
    onSuccess: on.success,
    onSettled: on.settled,
  })

  //update mutation
  const {
    isPending: isUpdating,
    mutate: update,
    error: updateError,
  } = useMutation({
    mutationKey: options?.mutationKeys?.update || [
      `update-${endpoint.substring(1)}`,
    ],
    mutationFn: options?.customMutations?.update || updateMutation,
    onError: on.error,
    onSuccess: on.success,
    onSettled: on.settled,
  })

  //delete mutation
  const {
    isPending: isDeleting,
    mutate: deleteItem,
    error: deleteError,
  } = useMutation({
    mutationKey: options?.mutationKeys?.delete || [
      `delete-${endpoint.substring(1)}`,
    ],
    mutationFn: deleteMutation,
    onError: on.error,
    onSuccess: on.success,
    onSettled: on.settled,
  })

  const isPending = isUpdating || isCreating || isDeleting
  const error = createError || updateError || deleteError

  return {
    error,
    create,
    update,
    deleteItem,
    isPending,
  }
}
