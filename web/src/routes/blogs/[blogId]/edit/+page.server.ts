import type { BlogsResponse } from '$lib/pocketbase-types'
import { serializeRecordResponse } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import type { Actions, RequestEvent } from './$types'

export const load = async (event: RequestEvent) => {
  const { locals, params } = event

  if (!locals.user || !locals.pb.authStore.isValid) throw error(401, 'Unauthorized')

  try {
    const response = await locals.pb.collection('blogs').getOne<BlogsResponse>(params.blogId)
    const blog = serializeRecordResponse<BlogsResponse>(response)

    if (locals.user.id === blog.user) return { blog }

    throw error(403, 'Forbidden')
  } catch (err) {
    console.error('getBlog:', err)

    if (err instanceof ClientResponseError) {
      throw error(err.status, err.message)
    }

    throw error(400, `Something went wrong when loading blog with id ${params.blogId}`)
  }
}

export const actions: Actions = {
  updateBlog: async ({ request, locals, params }) => {
    if (!locals || !locals.user) throw redirect(303, '/login')

    const data = await request.formData()
    const thumbnail = data.get('thumbnail') as Blob

    if (thumbnail && thumbnail.size === 0) {
      data.delete('thumbnail')
    }

    try {
      await locals.pb.collection('blogs').update(params.blogId, data)
    } catch (err) {
      console.error('updateBlog:', err)

      if (err instanceof ClientResponseError) {
        throw error(err.status, err.message)
      }

      throw error(400, 'Something went wrong when updating a blog')
    }

    throw redirect(303, '/my/blogs')
  },
  deleteThumbnail: async ({ locals, params }) => {
    try {
      await locals.pb.collection('blogs').update(params.blogId, { thumbnail: null })
    } catch (err) {
      console.error('deleteThumbnail:', err)

      if (err instanceof ClientResponseError) {
        throw error(err.status, err.message)
      }

      throw error(400, 'Something went wrong when deleting a blog thumbnail')
    }

    return {
      success: true
    }
  }
}
