import { randomBytes } from "crypto"
import type { UsersRecord } from "./pocketbase-types"

export const serializeNonPOJOs = (obj: any): UsersRecord => {
  return structuredClone(obj)
}

export const generateUsername = (name: string) => {
  const id = randomBytes(2).toString('hex')
  return `${name.slice(0, 5)}${id}`
}