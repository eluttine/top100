import { error } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals || !locals.user) return

    const data = await request.formData()
    const avatar = data.get('avatar') as Blob

    if (avatar && avatar.size === 0) {
      data.delete('avatar')
    }

    try {
      const { name, avatar } = await locals.pb
        .collection('users')
        .update(locals?.user?.id || '', data)

      locals.user.name = name
      locals.user.avatar = avatar
    } catch (err) {
      console.error('Error: updateProfile:', err)

      throw error(400, 'Something went wrong when updating profile')
    }

    return {
      success: true
    }
  }
}
