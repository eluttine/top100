<script lang="ts">
  import { getImageURL } from '$lib/utils'
  export let data
</script>

<div class="flex flex-col w-full mt-4">
  <div class="avatar">
    <div class="w-20 rounded">
      <img
        src={data?.blog?.thumbnail
          ? getImageURL(data.blog.collectionId, data.blog.id, data.blog.thumbnail, '400x300')
          : `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data?.blog?.name}`}
        alt="blogin thumbnail"
      />
    </div>
  </div>
  <h1 class="text-2xl font-bold mt-4">{data?.blog?.name}</h1>
  <a href={data?.blog?.url} target="_blank" rel="noreferrer noopener">{data?.blog?.url}</a>
</div>
