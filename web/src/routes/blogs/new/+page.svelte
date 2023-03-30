<script lang="ts">
  import { Input } from '$lib/components'
  import { enhance } from '$app/forms'
</script>

<div class="flex flex-col w-full h-full p-2">
  <div class="w-full">
    <form
      action="?/create"
      method="POST"
      class="flex flex-col space-y-2 w-full items-center"
      enctype="multipart/form-data"
      use:enhance
    >
      <h3 class="text-3xl font-bold">Lisää uusi blogi</h3>
      <p class="mt-2 text-lg">Syötä tarvittavat tiedot ja paina lähetä.</p>
      <Input id="name" label="Blogin nimi" />
      <Input id="url" label="Blogin osoite" />
      <div class="form-control w-full max-w-lg">
        <label for="description" class="label font-medium pb-1">
          <span class="label-text">Blogin kuvaus</span>
        </label>
        <textarea name="description" class="textarea textarea-bordered h-24 resize-none" />
      </div>
      <div class="form-control w-full max-w-lg">
        <label for="thumbnail" class="label font-medium pb-1">
          <span class="label-text">Blogin kuva</span>
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          class="file-input file-input-bordered w-full max-w-lg"
        />
      </div>
      <div class="w-full max-w-lg pt-3">
        <button type="submit" class="btn btn-primary w-full max-w-lg">Lähetä blogi</button>
      </div>
    </form>
  </div>
</div>
