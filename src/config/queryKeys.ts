export const queryKeys = {
  habits: {
    get: ["habits"],
    update: ["update-habit"],
    delete: ["delete-habit"],
    create: ["create-habit"],
    complete: ["complete-habit"],
  },
  stats: {
    get: ["stats"],
  },
  statsState: {
    get: ["stats-state"],
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
