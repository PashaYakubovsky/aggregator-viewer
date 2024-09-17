// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	export type Meme = {
		id: string;
		name: string;
		imageUrl: string;
		createdAt: Date;
		from: string;
		type: string;
	};
}

export {};
