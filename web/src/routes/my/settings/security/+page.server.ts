import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  updatePassword: async ({ request, locals }) => {
    if (!locals || !locals.user) return { success: false }

    const data = Object.fromEntries(await request.formData()) as {
      oldPassword: string
      password: string
      passwordConfirm: string
    }

    try {
      await locals.pb.collection('users').update(locals.user.id, data)
      locals.pb.authStore.clear()
    } catch (err) {
      console.warn('updatePassword error:', err)

      throw error(400, 'Something went wrong when updating password')
    }

    throw redirect(303, '/login')
  }
}
