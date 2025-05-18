import { useState } from "react"
import { View, Button } from "react-native"
import PopUpText from "@/features/stats/components/animatedPoints/PointsAnimation"

const App = () => {
  const [points, setPoints] = useState(0)

  const handlePoints = () => {
    setPoints((prev) => prev + 10)
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Gain Points" onPress={handlePoints} />
      <PopUpText points={10} key={points} />
    </View>
  )
}

export default App
