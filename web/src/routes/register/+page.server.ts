import { generateUsername } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      name: string
      email: string
      password: string
      passwordConfirm: string
    }

    const username = generateUsername(data.name.split(' ').join('')).toLowerCase()

    try {
      await locals.pb.collection('users').create({ username, ...data })
      await locals.pb.collection('users').requestVerification(data.email)
    } catch (err) {
      console.error(err)
      throw error(500, 'Something went wrong when registering')
    }

    throw redirect(303, '/welcome')
  }
}
