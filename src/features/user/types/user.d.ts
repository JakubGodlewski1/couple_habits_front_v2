type UserFromBackend = {
  email: string
  connectionCode: string
  hasPartner: boolean
  partnerName: string
  gameAccountId: number | null
  habitSkipPrice: number
}

type UpdateUser = {
  partnerName: string
}
