import { AxiosError } from "axios"

export const getAxiosErrorMessage = (
  error: Error | AxiosError | null | undefined,
): string | null => {
  if (!error) return null

  let errorMessage
  if ("response" in error && error.response) {
    errorMessage =
      // @ts-expect-error message exists on data
      error?.response?.data?.message ||
      error?.response?.statusText ||
      error.message
  } else errorMessage = error.message

  return errorMessage
}
