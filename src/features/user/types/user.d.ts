type UserFromBackend = {
  email: string
  connectionCode: string
  hasPartner: boolean
  partnerName: string
  gameAccountId: number | null
}

type UpdateUser = {
  partnerName: string
}
