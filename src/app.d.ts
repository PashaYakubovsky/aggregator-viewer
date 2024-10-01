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

	export type Aggregation = {
		id: string;
		name: string;
		imageUrl: string;
		createdAt: Date;
		from: string;
		type: string;
		createdAtTime: number;
		selftext: string;
		selftextHtml: string;
		subreddit: string;
		permalink: string;
		color?: string;
	};

	export type User = {
		id: string;
		subscribedTopics: string[];
		username: string;
	};
}

export {};
