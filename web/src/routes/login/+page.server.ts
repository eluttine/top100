import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    try {
      await locals.pb.collection('users').authWithPassword(data.email, data.password)
    } catch (err) {
      console.log('Login failed with email', data.email)
      console.log('err', err)

      throw error(400, 'Something went wrong when logging in')
    }

    throw redirect(303, '/')
  }
}
