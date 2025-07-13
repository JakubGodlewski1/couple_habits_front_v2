import { useState } from "react"
import { View, FlatList, Image, TouchableOpacity } from "react-native"
import { usePexelsGallery } from "@/features/rewards/api/hooks/usePexelsGallery"
import Modal from "@/components/Modal"
import Input from "@/components/Input"
import Text from "@/components/Text"
import Button from "@/components/Button"
import { EvilIcons } from "@expo/vector-icons"

type Props = {
  visible: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export function PexelsGallery({ visible, onClose, onSelect }: Props) {
  const [searchedPhrase, setSearchedPhrase] = useState<string>("")
  const { images, loading, search } = usePexelsGallery()

  return (
    <Modal onClose={onClose} isOpen={visible}>
      <View className="pt-4 grow ">
        <View className="flex-row justify-between items-center mb-6">
          <Text type="h2">Find reward&apos;s image</Text>
          <TouchableOpacity className="p-2" onPress={onClose}>
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="gap-2">
          <Input
            placeholder="eg. cinema"
            onSubmitEditing={() => {
              if (searchedPhrase.length > 1) {
                search(searchedPhrase)
              }
            }}
            value={searchedPhrase}
            onChangeText={setSearchedPhrase}
          />
          <Button
            disabled={loading}
            onPress={() => {
              if (searchedPhrase.length > 1) {
                search(searchedPhrase)
              }
            }}
            title={loading ? "Searching" : "Search"}
          />
        </View>
        {images.length === 0 && !loading && (
          <View className="grow items-center justify-center">
            <Text className="text-gray-500">
              You will see your searched images here
            </Text>
          </View>
        )}
        {images.length > 0 && (
          <FlatList
            contentContainerClassName="pb-[450px]"
            className="mt-4"
            data={images}
            keyExtractor={(item, index) => item + index}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
                style={{ marginBottom: 10, flex: 1, marginHorizontal: 2 }}
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  )
}
