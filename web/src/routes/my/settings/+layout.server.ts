import { redirect } from '@sveltejs/kit'
import type { RequestEvent } from './$types'

export const load = (event: RequestEvent) => {
  if (!event.locals.pb.authStore.isValid) {
    throw redirect(303, '/login')
  }
}
