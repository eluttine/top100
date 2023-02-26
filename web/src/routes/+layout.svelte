<script lang="ts">
  import { getImageURL } from '$lib/utils'
  import '../app.postcss'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="min-h-full">
  <nav class="navbar bg-base-100 border-b">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Top 100 Ruokablogit</a>
    </div>
    <div class="flex-none">
      {#if !data.user}
        <div class="dropdown dropdown-end">
          <a href="/login" class="btn btn-primary">Kirjaudu</a>
          <a href="/register" class="btn btn-secondary">Rekisteröidy</a>
        </div>
      {:else}
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                src={data.user?.avatar
                  ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
                  : `https://ui-avatars.com/api/?name=${data.user?.name}`}
                alt="avatarkuva"
              />
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w 52"
          >
            <li>
              <a href="/my/posts" class="justify-between">My posts</a>
            </li>
            <li>
              <a href="/my/settings">Settings</a>
            </li>
            <li>
              <form action="/logout" method="POST">
                <button class="w-full text-start">Kirjaudu ulos</button>
              </form>
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </nav>

  <div class="py-4">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <slot />
    </div>
  </div>
</div>
