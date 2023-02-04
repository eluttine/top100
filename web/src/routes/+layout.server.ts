import type { RequestEvent } from '@sveltejs/kit'

export const load = (event: RequestEvent) => {
  const locals = event.locals

  if (locals.user) {
    return {
      user: locals.user
    }
  }

  return {
    user: undefined
  }
}