// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			pb: import('$lib/types').PocketBase
			user: import('$lib/types').UsersRecord | undefined
		}
	
		interface PageData {}
		interface Error {}
		interface Platform {}
	}
}

export {};
