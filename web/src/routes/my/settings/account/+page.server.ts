import { error } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  updateEmail: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
    }

    try {
      await locals.pb.collection('users').requestEmailChange(data.email)
    } catch (err) {
      console.warn('Failed to change email to', data.email)
      console.error('err', err)

      throw error(400, 'Something went wrong when changing email')
    }

    return {
      success: true
    }
  },
  updateUsername: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      username: string
    }

    try {
      await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`)
    } catch (err: unknown) {
      const pbError = err as { status: number; message: string }
      if (pbError.status === 404) {
        try {
          if (locals.user?.id) {
            const { username } = await locals.pb
              .collection('users')
              .update(locals.user?.id, { username: data.username })

            locals.user.username = username

            return {
              success: true
            }
          }

          throw error(400, 'Username not defined')
        } catch (err) {
          console.error('Error: ', err)
          throw error(400, 'Something went wrong when changing username')
        }
      }
      console.warn('Error: ', pbError)
      throw error(400, 'Something went wrong when changing username')
    }
  }
}
