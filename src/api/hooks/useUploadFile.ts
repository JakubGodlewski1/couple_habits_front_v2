import { API_URL } from "@/config/apiUrl"
import * as FileSystem from "expo-file-system"
import { FileSystemUploadType } from "expo-file-system"
import { useAuth } from "@clerk/clerk-expo"

type Props = {
  fileUri: string
  fileName: string
  endpoint: string
  method: "POST" | "PUT" | "PATCH"
}

export const useUploadFile = () => {
  const { getToken } = useAuth()

  const uploadFile = async ({ fileUri, fileName, endpoint, method }: Props) => {
    return await FileSystem.uploadAsync(API_URL + endpoint, fileUri, {
      httpMethod: method,
      headers: { Authorization: `Bearer ${await getToken()}` },
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: fileName,
    })
  }

  return { uploadFile }
}
