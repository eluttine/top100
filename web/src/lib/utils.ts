import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { Admin, Record } from 'pocketbase'

export const serializeNonPOJOs = (obj: unknown): Record | Admin | null => {
  return structuredClone(obj) as Record | Admin | null
}

export function serializeRecordResponse<Type>(obj: Type): Type {
  return structuredClone(obj) as Type
}

export const getImageURL = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = '0x0'
) => {
  return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumbs=${size}`
}
