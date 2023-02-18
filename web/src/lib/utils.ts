import { randomBytes } from 'crypto'
import type { Admin, Record } from 'pocketbase'

export const serializeNonPOJOs = (obj: unknown): Record | Admin | null => {
  return structuredClone(obj) as Record | Admin | null
}

export const generateUsername = (name: string) => {
  const id = randomBytes(2).toString('hex')
  return `${name.slice(0, 5)}${id}`
}
