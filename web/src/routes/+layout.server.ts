import type { RequestEvent } from './$types'

export const load = (event: RequestEvent) => {
  if (event.locals.user) {
    return {
      user: event.locals.user
    }
  }

  return {
    user: null
  }
}
