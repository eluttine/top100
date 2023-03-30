<script lang="ts">
  import { BlogItem } from '$lib/components'
  import type { BlogsResponse } from '$lib/pocketbase-types'

  export let data: FormData & { blogs: BlogsResponse[] }
</script>

<h2 class="text-3xl font-bold">Omat blogit</h2>
<div class="w-full mt-4 flex flex-col items-center">
  {#if data.blogs.length === 0}
    <p class="text-center text-3xl">Ei omia blogeja.</p>
    <a href="/blogs/new" class="btn btn-primary max-w-md mt-4">Lisää</a>
  {:else}
    {#each data.blogs as blog}
      <BlogItem {blog} />
      <div class="divider mt-0 mb-2" />
    {/each}
  {/if}
</div>
