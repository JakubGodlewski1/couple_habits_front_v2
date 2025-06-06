import { useState } from "react"
import { useAddPartner } from "@/features/addPartner/api/hooks/useAddPartner"
import { getAxiosErrorMessage } from "@/utils/getAxiosErrorMessage"
import { useGetUser } from "@/features/user/api/hooks/useGetUser"

export const useAddPartnerForm = () => {
  const [connectionCode, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const user = useGetUser().user!

  const { addPartner, isPending, error: mutationError } = useAddPartner()

  const handleSubmit = () => {
    if (connectionCode.length !== 6) {
      setError("Code must be 6 characters long")
      return
    }

    if (connectionCode.toLowerCase() === user?.connectionCode.toLowerCase()) {
      setError("You can't connect to yourself")
      return
    }

    addPartner(connectionCode)
  }

  return {
    isPending,
    onCodeChange: (value: string) => {
      setError(null)
      setCode(value)
    },
    connectionCode,
    handleSubmit,
    error: error || getAxiosErrorMessage(mutationError),
  }
}
