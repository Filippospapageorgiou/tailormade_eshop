<script lang="ts">
	import { Motion } from 'svelte-motion';
	import HearAnimation from './IconAnimations/HearAnimation.svelte';

	type Props = {
		imageUrl: string;
		name: string;
		price: string;
		href?: string;
		userLoggedIn?:boolean
	};

	let { imageUrl, name, price, href = '/',userLoggedIn }: Props = $props();
</script>

<Motion
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.5, delay: 0.1 }}
	let:motion
>
	<div use:motion class="group relative text-left">
		<a {href}>
			<div class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
				<img
					src={imageUrl}
					alt={name}
					class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
		</a>
		<div class="flex flex-row items-center justify-between">
			<h3 class="mt-4 text-base text-foreground">{name}</h3>
			{#if userLoggedIn}
			<button
				class="flex items-center justify-center rounded-full bg-background/60 p-2 text-foreground/70 backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-primary focus:ring-2 focus:ring-ring focus:outline-none"
				aria-label="Add to favorites"
			>
				<HearAnimation />
			</button>
			{/if}
		</div>
		<p class="mt-1 text-xl text-gray-500">{price}</p>
	</div>
</Motion>
