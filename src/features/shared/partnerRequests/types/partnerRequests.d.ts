type RequestOption = "skipHabit" | "response"

type CreatePartnerRequest = {
  data: string
  option: RequestOption
}

type SkipHabitOption = {
  option: "skipHabit"
  data: { id: number }
  requestedBy: "user" | "partner"
}

type ResponseOption = {
  option: "response"
  data: { accepted: boolean; option: Exclude<RequestOption, "response"> }
  requestedBy: "user" | "partner"
}

type Option = SkipHabitOption | ResponseOption

type PartnerRequestFromBackend<WITHOUT_NULL extends boolean = false> =
  WITHOUT_NULL extends true ? Option : Option | { option: null }
