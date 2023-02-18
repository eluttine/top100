<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from '$lib/pocketbase'
</script>

<form method="POST" class="card" use:enhance={() => {
	return async ({result }) => {
		pb.authStore.loadFromCookie(document.cookie)
		await applyAction(result)
	}
}}>
	<h1 class="text-2xl mb-8">Kirjaudu sisään</h1>
	<div class="form-control gap-2 mb-2">
		<input type="email" name="email" placeholder="Sähköposti" class="input input-bordered" />
		<input type="password" name="password" placeholder="Salasana" class="input input-bordered" />

		<button class="btn btn-primary">Kirjaudu</button>
	</div>
</form>
