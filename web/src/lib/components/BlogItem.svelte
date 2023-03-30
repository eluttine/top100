<script lang="ts">
  import { enhance } from '$app/forms'
  import type { BlogsResponse } from '$lib/pocketbase-types'
  import { getImageURL } from '$lib/utils'
  import { Modal } from '$lib/components'

  export let blog: BlogsResponse

  let modalOpen: boolean

  $: modalOpen = false
</script>

<div class="w-full h-28 flex items-center justify-between">
  <div class="avatar">
    <div class="w-20 rounded">
      <img
        src={blog?.thumbnail
          ? getImageURL(blog.collectionId, blog.id, blog.thumbnail, '400x300')
          : `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${blog.name}`}
        alt="blogin thumbnail"
      />
    </div>
  </div>
  <div class="flex flex-col w-full ml-4 h-full justify-center">
    <a href="/blogs/{blog.id}" class="font-semibold text-lg">{blog.name}</a>
  </div>
  <div class="flex items-center jutify-end w-full">
    <a href="/blogs/{blog.id}/edit" class="btn btn-outline">Muokkaa</a>
    <Modal label={blog.id} checked={modalOpen}>
      <span slot="trigger" class="btn btn-error ml-2">Poista</span>
      <p class="text-base font-normal mt-2">Haluatko varmasti poistaa blogin?</p>
      <div slot="actions" class="flex w-full items-center justify-center space-x-2">
        <label for={blog.id} class="btn btn-outline">Peruuta</label>
        <form action="?/deleteBlog" method="POST" use:enhance>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" class="btn btn-error">Poista</button>
        </form>
      </div>
    </Modal>
  </div>
</div>
