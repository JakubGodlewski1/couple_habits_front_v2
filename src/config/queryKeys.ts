export const queryKeys = {
  habits: {
    skip: ["skip-habit"],
    get: ["habits"],
    update: ["update-habit"],
    delete: ["delete-habit"],
    create: ["create-habit"],
    toggle: ["toggle-habit"],
  },
  stats: {
    get: ["stats"],
  },
  statsStrikeCompletion: {
    get: ["stats-strike-completion"],
  },
  avatars: {
    get: ["avatars"],
    upload: ["upload-avatar"],
  },
  users: {
    get: ["user"],
    delete: ["delete-user"],
  },
  gameAccounts: {
    addPartner: ["add-partner"],
  },
  partnerRequests: {
    get: ["partner-requests"],
    delete: ["delete-partner-request"],
    send: ["send-partner-request"],
  },
  dayOff: {
    get: ["day-off"],
    take: ["take-day-off"],
  },
  feedback: {
    send: ["send-feedback"],
  },
  subscription: {
    get: ["subscriptions"],
  },
  featureFlags: {
    get: ["feature-flags"],
  },
}
