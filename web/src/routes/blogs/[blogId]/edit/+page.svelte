<script lang="ts">
  import { Icon, Trash } from 'svelte-hero-icons'
  import { Input } from '$lib/components'
  import { getImageURL } from '$lib/utils'
  import type { BlogsResponse } from '$lib/pocketbase-types'

  export let data: FormData & { blog: BlogsResponse }
</script>

<div class="flex flex-col w-full h-full p-2">
  <div class="w-full">
    <form
      action="?/updateBlog"
      method="POST"
      class="flex flex-col space-y-2 w-full items-center"
      enctype="multipart/form-data"
    >
      <h3 class="text-3xl font-bold">{data.blog.name}</h3>
      <Input id="name" label="Blogin nimi" value={data.blog.name ?? ''} />
      <Input id="url" label="Blogin linkki" value={data.blog.url ?? ''} />
      <Input id="feed" label="Blogin RSS-syötte" value={data.blog.feed ?? ''} />
      <div class="form-control w-full max-w-lg">
        <label for="thumbnail" class="label font-medium pb-1">
          <span class="label-text">Oletuskuva</span>
        </label>
        {#if data.blog.thumbnail}
          <label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
            <label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
              <button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
                <Icon src={Trash} class="w-5 h-5 text-white" />
              </button>
            </label>
            <div class="w-20 rounded">
              <img
                src={data?.blog?.thumbnail
                  ? getImageURL(
                      data.blog.collectionId,
                      data.blog.id,
                      data.blog.thumbnail,
                      '400x300'
                    )
                  : `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data?.blog?.name}`}
                alt="blogin thumbnail"
              />
            </div>
          </label>
        {/if}
        <input
          name="thumbnail"
          id="thumbnail"
          type="file"
          class="file-input file-input-bordered w-full max-w-lg mt-2"
        />
        <div class="w full max-w-lg pt-3">
          <button type="submit" class="btn btn-primary w-full max-w-lg">Tallenna</button>
        </div>
      </div>
    </form>
  </div>
</div>
