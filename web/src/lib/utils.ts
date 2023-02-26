import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import { randomBytes } from 'crypto'
import type { Admin, Record } from 'pocketbase'

export const serializeNonPOJOs = (obj: unknown): Record | Admin | null => {
  return structuredClone(obj) as Record | Admin | null
}

export const generateUsername = (name: string) => {
  const id = randomBytes(2).toString('hex')
  return `${name.slice(0, 6)}${id}`
}

export const getImageURL = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = '0x0'
) => {
  return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumbs=${size}`
}
