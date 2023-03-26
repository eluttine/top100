import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals || !locals.user) throw redirect(303, '/login')

    const data = await request.formData()
    const thumbnail = data.get('thumbnail') as Blob

    if (thumbnail && thumbnail.size === 0) {
      data.delete('thumbnail')
    }

    data.append('user', locals.user.id)

    try {
      await locals.pb.collection('blogs').create(data)
    } catch (err) {
      console.error('Error: create:', err)

      throw error(400, 'Something went wrong when creating a blog')
    }

    throw redirect(303, '/')
  }
}
