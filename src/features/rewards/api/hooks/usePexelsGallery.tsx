import { useState } from "react"

const API_KEY1 = process.env.EXPO_PUBLIC_PEXELS_API_KEY1!
const API_KEY2 = process.env.EXPO_PUBLIC_PEXELS_API_KEY2!
const PER_PAGE = 30

function getRandomApiKey() {
  return Math.random() < 0.5 ? API_KEY1 : API_KEY2
}

export function usePexelsGallery() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const search = async (query: string) => {
    if (!query) return

    const API_KEY = getRandomApiKey()
    setLoading(true)

    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}`,
        {
          headers: { Authorization: API_KEY },
        },
      )
      const data = await res.json()
      setImages(data.photos.map((p: any) => p.src.medium))
    } catch (e) {
      console.error("Pexels API error:", e)
    } finally {
      setLoading(false)
    }
  }

  return { images, loading, search }
}
