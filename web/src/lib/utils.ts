import type { UsersRecord } from "./pocketbase-types"

export const serializeNonPOJOs = (obj: any): UsersRecord => {
  return structuredClone(obj)
}
