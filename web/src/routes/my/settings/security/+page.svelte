<script lang="ts">
  import { Input } from '$lib/components'
</script>

<div class="flex flex-col w-full h-full">
  <div class="w-full">
    <form action="?/updatePassword" method="POST" class="flex flex-col space-y-2 w-full">
      <h3 class="text-2xl font-medium">Vaihda salasana</h3>
      <div class="divider" />
      <Input id="oldPassword" label="Vanha salasana" type="password" required />
      <Input id="password" label="Uusi salasana" type="password" required />
      <Input id="passwordConfirm" label="Uusi salasana toisen kerran" type="password" required />
      <a href="/reset-password" class="text-primary hover:cursor-point hover-underline"
        >Unohdin salasanani</a
      >
      <div class="w-full max-w-lg pt-3">
        <button class="btn btn-primary w-full max-w-lg">Vaihda salasana</button>
      </div>
    </form>
  </div>
</div>
