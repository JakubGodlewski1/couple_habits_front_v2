// utils/tutorialStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage"

export type TutorialSeenMap = Record<TutorialType, boolean>

const STORAGE_KEY = "seenTutorials"

export class TutorialStore {
  async set(tutorial: TutorialType, seen: boolean): Promise<void> {
    const current = await this.getAll()
    current[tutorial] = seen
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  }

  async getAll(): Promise<TutorialSeenMap> {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    if (value) {
      try {
        const parsed = JSON.parse(value)
        return {
          discordInvite: false,
          connection: false,
          firstHabit: false,
          avatar: false,
          intro: false,
          ...parsed, // ensure all keys exist, fallback to false
        }
      } catch {
        return {
          discordInvite: false,
          connection: false,
          firstHabit: false,
          partnerAvatar: false,
          intro: false,
        }
      }
    }
    return {
      discordInvite: false,
      connection: false,
      firstHabit: false,
      partnerAvatar: false,
      intro: false,
    }
  }
}
