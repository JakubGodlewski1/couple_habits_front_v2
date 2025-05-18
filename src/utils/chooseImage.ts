import * as ImagePicker from "expo-image-picker"

export const chooseImage = async (quality: number) => {
  // Request media library permissions
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== "granted") {
    alert("Permission to access the media library is required!")
    return
  }

  // Open the image picker with updated options
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1], // Crop to square
    quality,
  })

  if (!result.canceled) {
    const { uri } = result.assets[0]
    return uri
  }
}
