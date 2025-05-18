type FeedbackDropdownOptions = {
  key: "bug" | "feature" | "question" | "general"
  label: string
}[]

export const FEEDBACK_DROPDOWN_OPTIONS: FeedbackDropdownOptions = [
  { key: "bug", label: "Report a bug" },
  { key: "feature", label: "Propose a feature" },
  { key: "question", label: "Ask a question" },
  { key: "general", label: "General feedback" },
] as const
