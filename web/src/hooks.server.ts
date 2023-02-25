import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import { serializeNonPOJOs } from '$lib/utils'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL)
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    console.log('in handle function')
    if (event.locals.pb.authStore.isValid) {
      event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
    }
  } catch (_) {
    // clear the auth store on failed refresh
    event.locals.pb.authStore.clear()
  }

  const response = await resolve(event)

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie())

  return response
}
