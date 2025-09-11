<script lang="ts">
	import ProductCard from '$lib/custom/ProductCard.svelte';
	import { Motion } from 'svelte-motion';

	let { data } = $props();

	// Get user from data
	const { user } = $derived(data);
	let userLoggedIn:boolean = $state(false);

	$effect(() =>{
		if(user){
			userLoggedIn = true;
		}
	})
	
	const products = [
		{
			name: 'Colombia Single Origin',
			price: '13,00 € - 26,00 €',
			imageUrl: '/120.jpg', // Your actual product image
			href: '/products/colombia-single-origin'
		},
		{
			name: 'Ethiopia Single Origin',
			price: '18,00 €',
			imageUrl: '/121.jpg', // Your actual product image
			href: '/products/ethiopia-single-origin'
		},
		{
			name: 'Tailor Made Tote Bag',
			price: '22,00 €',
			// NOTE: You'll want to replace this with an actual image of your tote bag!
			imageUrl: '/121.jpg', 
			href: '/products/tote-bag'
		}
	];
</script>

<section class="w-full bg-background py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Motion
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			let:motion
		>
			<h2 use:motion class="text-3xl font-light tracking-wider text-foreground sm:text-4xl uppercase mb-12">
				BEST SELLING PRODUCTS
			</h2>
		</Motion>

		<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
			{#each products as product}
				<ProductCard
					name={product.name}
					price={product.price}
					imageUrl={product.imageUrl}
					href={product.href}
					userLoggedIn={userLoggedIn}
				/>
			{/each}
		</div>
	</div>
</section>