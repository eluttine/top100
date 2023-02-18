import { generateUsername } from '$lib/utils'
import { error, redirect, type RequestEvent } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
      passwordConfirm: string
    }

    try {
      await locals.pb.collection('users').create(data)
      await locals.pb.collection('users').requestVerification(data.email)
    } catch (err) {
      console.error(err)
      throw error(500, 'Something went wrong when registering')
    }

    throw redirect(303, '/login')
  }
}
