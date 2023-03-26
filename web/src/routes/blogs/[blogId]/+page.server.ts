import { serializeNonPOJOs } from '$lib/utils'
import { error } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import type { RequestEvent } from './$types'

export const load = (event: RequestEvent) => {
  const { locals, params } = event

  const getBlog = async (blogId: string) => {
    try {
      const blog = serializeNonPOJOs(await locals.pb.collection('blogs').getOne(blogId))
      return blog
    } catch (err) {
      console.error('Error: getBlog:', err)

      if (err instanceof ClientResponseError) {
        throw error(err.status, err.message)
      }

      throw error(400, 'Something went wrong when getting a blog')
    }
  }

  return {
    blog: getBlog(params.blogId)
  }
}
