// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

interface userSession {
    email: string,
	username: string,
    id: string
}
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: userSession
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
