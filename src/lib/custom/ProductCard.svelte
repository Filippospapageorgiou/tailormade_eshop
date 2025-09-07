<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart, ArrowRight } from 'lucide-svelte';
	import { Motion } from 'svelte-motion';

	type Props = {
		imageUrl: string;
		name: string;
		tasteProfile: string;
		price: string;
	};

	let { imageUrl, name, tasteProfile, price }: Props = $props();
</script>

<div class="">
	
</div>