type RewardsMainTabsKey = "store" | "purchased" | "used"

type RewardsPriceTabsKey = "cheap" | "expensive" | "luxury"

type RewardFromStoreFromBackend = {
  id: number
  label: string
  price: number
  imageUrl: string
  tab: RewardsPriceTabsKey
}

type RewardFromBackend =
  | RewardFromStoreFromBackend
  | (RewardFromStoreFromBackend & { isUsed: boolean })

type RewardsFromBackend = {
  store: RewardFromStoreFromBackend[]
  purchased: (RewardFromStoreFromBackend & { isUsed: boolean })[]
}

type RewardsForm = {
  label: string
  price: numberRewardsPriceTabsKey
  tab: RewardsPriceTabsKey
  imageUrl: string
}
