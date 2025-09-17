<script lang="ts">
	import lottie from 'lottie-web';
	import type { AnimationDirection, AnimationItem } from 'lottie-web';
	import { toast } from "$lib/stores/toast.svelte";
	let direction:AnimationDirection = $state(1);

	
	let container: HTMLDivElement;
	let animation: AnimationItem;

	let addedToFav:boolean = $state(false);

	
	$effect(() => {
		if (container) {
			animation = lottie.loadAnimation({
				container: container,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: '/animations/Heart/heart.json'
			});
			return () => {
				animation.destroy();
			};
		}
	});

	function toggleAnimation() {
		addedToFav = !addedToFav;
		if (!animation) return; 

		animation.setDirection(direction);
		animation.play();
		
		direction *= -1;
	}

	$effect(() => {
		if(addedToFav){
			toast.show = true;
        	toast.status = true;
            toast.title = 'Success';
			toast.text = 'Product added to favroites go to your account and see all your favroite products';
		}
	})
</script>

<div
	bind:this={container}
	onclick={toggleAnimation}
	class="bodymovinanim"
	aria-label="Toggle menu animation"
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && toggleAnimation()}
>
</div>

<style>
	.bodymovinanim {
		width: 90%;
		max-width: 50px;
		cursor: pointer;
	}
</style>