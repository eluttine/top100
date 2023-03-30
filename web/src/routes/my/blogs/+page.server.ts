import type { BlogsResponse } from '$lib/pocketbase-types'
import { serializeRecordResponse } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import type { Actions, RequestEvent } from './$types'

export const load = async (event: RequestEvent) => {
  const { locals, params } = event

  if (!locals.user || !locals.pb.authStore.isValid) throw redirect(303, '/login')

  const getUserBlogs = async (userId: string) => {
    try {
      const response = await locals.pb.collection('blogs').getFullList<BlogsResponse>(undefined, {
        filter: `user = "${userId}"`
      })
      return serializeRecordResponse(response)
    } catch (err) {
      console.error('getUserBlogs:', err)

      if (err instanceof ClientResponseError) {
        throw error(err.status, err.message)
      }

      throw error(400, `Something went wrong when loading blogs with user id ${userId}`)
    }
  }

  return {
    blogs: getUserBlogs(locals.user.id)
  }
}

export const actions: Actions = {
  deleteBlog: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData()) as {
      id: string
    }

    try {
      await locals.pb.collection('blogs').delete(id)
    } catch (err) {
      console.error('deleteBlog:', err)

      if (err instanceof ClientResponseError) {
        throw error(err.status, err.message)
      }

      throw error(400, 'Something went wrong when deleting a blog')
    }

    return {
      success: true
    }
  }
}
