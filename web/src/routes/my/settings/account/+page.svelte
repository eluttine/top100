<script lang="ts">
  import { enhance, applyAction } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import { Input, Modal } from '$lib/components'
  import type { ActionResult } from '@sveltejs/kit'
  import type { PageData } from './$types'

  export let form: { data?: { email?: string; username?: string } }
  export let data: PageData

  let emailModalOpen: boolean
  let usernameModalOpen: boolean
  let loading: boolean

  $: emailModalOpen = false
  $: usernameModalOpen = false
  $: loading = false

  const submitUpdateEmail = () => {
    loading = true
    emailModalOpen = true

    return async ({ result }: { result: ActionResult }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll()
          emailModalOpen = false
          break
        case 'error':
          break
        default:
          await applyAction(result)
      }
      loading = false
    }
  }

  const submitUpdateUsername = () => {
    loading = true
    usernameModalOpen = true

    return async ({ result }: { result: ActionResult }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll()
          usernameModalOpen = false
          break
        case 'error':
          break
        default:
          await applyAction(result)
      }
      loading = false
    }
  }
</script>

<div class="flex flex-col w-full h-full space-y-12">
  <div class="w-full">
    <h3 class="text-2xl font-medium">Vaihda sähköposti</h3>
    <div class="divider" />
    <Modal label="change-email" checked={emailModalOpen}>
      <span slot="trigger" class="btn btn-primary">Vaihda sähköposti</span>
      <h3 slot="heading">Vaihda sähköposti</h3>
      <form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
        <Input
          id="email"
          type="email"
          label="Uusi sähköposti"
          required={true}
          value={form?.data?.email}
          disabled={loading}
        />
        <button type="submit" class="btn btn-primary w-full" disabled={loading}>Tallenna</button>
      </form>
    </Modal>
  </div>
  <div class="w-full">
    <h3 class="text-2xl font-medium">Vaihda käyttäjätunnus</h3>
    <div class="divider mb-0.5" />
    <Input id="username" label="Käyttäjätunnus" value={data?.user?.username} disabled />
    <Modal label="change-username" checked={usernameModalOpen}>
      <span slot="trigger" class="btn btn-primary">Vaihda käyttäjätunnus</span>
      <h3 slot="heading">Vaihda käyttäjätunnus</h3>
      <form
        action="?/updateUsername"
        method="POST"
        class="space-y-2"
        use:enhance={submitUpdateUsername}
      >
        <Input
          id="username"
          type="text"
          label="Uusi käyttäjätunnus"
          required={true}
          value={form?.data?.username}
          disabled={loading}
        />
        <button type="submit" class="btn btn-primary w-full" disabled={loading}>Tallenna</button>
      </form>
    </Modal>
  </div>
</div>
