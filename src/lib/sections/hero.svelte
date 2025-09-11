<script lang="ts">
	import { Motion, useAnimation } from 'svelte-motion';
	import { onMount } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let titleControls = useAnimation();
	let subtitleControls = useAnimation();
	let photoControls = useAnimation();
	let mounted = $state(false);

	// Staggered text animation
	const words = ['Crafted', 'Roasted', 'Delivered'];
	let visibleWords = $state<number[]>([]);

	onMount(async () => {
		mounted = true;

		// Animate subtitle and buttons
		subtitleControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 }
		});

		// Animate title
		await titleControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' }
		});

		// Animate words one by one
		for (let i = 0; i < words.length; i++) {
			visibleWords = [...visibleWords, i];
			await new Promise((resolve) => setTimeout(resolve, 300));
		}

		// Animate photos
		photoControls.start({
			opacity: 1,
			scale: 1,
			transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.1 }
		});
	});

	// Photo grid items with different sizes and improved alt text
	const photos = [
		{
			src: '/tailor1.png',
			alt: 'Barista carefully preparing a coffee at TailorMade Coffee Roasters',
			size: 'large'
		},
		{
			src: '/tailor2.png',
			alt: 'The interior of a modern and bright TailorMade coffee shop',
			size: 'medium'
		},
		{
			src: '/tailor3.png',
			alt: 'An assortment of TailorMade coffee beans and products on display',
			size: 'medium'
		},
		{
			src: '/tailor4.png',
			alt: 'The brew bar and counter at a TailorMade coffee shop',
			size: 'small'
		}
	];

	const photoVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: (i: number) => ({
			opacity: 1,
			scale: 1,
			transition: {
				delay: i * 0.15,
				duration: 0.8,
				ease: 'easeOut'
			}
		})
	};
</script>

<section
	class="relative flex h-auto items-center justify-center overflow-hidden px-4 py-24 text-left md:py-32"
>
	<div class="relative z-10 mx-auto w-full max-w-7xl">
		<div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
			<div class="space-y-8">
				<Motion initial={{ opacity: 0, y: 20 }} animate={titleControls} let:motion>
					<div use:motion class="space-y-6">
						<h1 class="text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
							TailorMade Coffee,
							<span class="mt-2 block font-normal text-primary">
								{#each words as word, i}
									<span
										class="inline-block transition-all duration-500 {visibleWords.includes(i)
											? 'translate-y-0 opacity-100'
											: 'translate-y-4 opacity-0'}"
										style="transition-delay: {i * 300}ms"
									>
										{word}{i < words.length - 1 ? '.' : ''}
									</span>
									{#if i < words.length - 1}
										<span class="inline-block w-2"></span>
									{/if}
								{/each}
							</span>
						</h1>
					</div>
				</Motion>

				<Motion initial={{ opacity: 0, y: 20 }} animate={subtitleControls} let:motion>
					<div use:motion>
						<p class="max-w-lg text-lg text-muted-foreground md:text-xl">
							Experience the art of specialty coffee, roasted to perfection and delivered fresh to
							your door.
						</p>

						<div class="mt-8 flex flex-col gap-4 sm:flex-row">
							<Button size="lg" href="/" class="btn-coffee">
								See our collection <ArrowRight class="ml-2 h-5 w-5" />
							</Button>
							<Button size="lg" variant="outline" href="/about">Our Story</Button>
						</div>
					</div>
				</Motion>
			</div>

			<Motion
				initial="hidden"
				animate={photoControls}
				variants={{
					visible: {
						transition: {
							staggerChildren: 0.1
						}
					}
				}}
				let:motion
			>
				<div use:motion class="relative h-[600px] lg:h-[700px]">
					<Motion
						custom={0}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? 'visible' : 'hidden'}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div
							use:motion
							class="absolute top-0 left-0 h-[50%] w-[60%] overflow-hidden rounded-2xl shadow-xl"
						>
							<img src={photos[0].src} alt={photos[0].alt} class="h-full w-full object-cover" />
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
						</div>
					</Motion>

					<Motion
						custom={1}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? 'visible' : 'hidden'}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div
							use:motion
							class="absolute top-12 right-0 h-[45%] w-[55%] overflow-hidden rounded-2xl shadow-lg"
						>
							<img src={photos[1].src} alt={photos[1].alt} class="h-full w-full object-cover" />
						</div>
					</Motion>

					<Motion
						custom={2}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? 'visible' : 'hidden'}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div
							use:motion
							class="absolute bottom-6 left-2 h-[43%] w-[47%] overflow-hidden rounded-2xl shadow-lg"
						>
							<img src={photos[2].src} alt={photos[2].alt} class="h-full w-full object-cover" />
						</div>
					</Motion>

					<Motion
						custom={3}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? 'visible' : 'hidden'}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div
							use:motion
							class="absolute right-2 bottom-0 h-[40%] w-[46%] overflow-hidden rounded-2xl shadow-md"
						>
							<img src={photos[3].src} alt={photos[3].alt} class="h-full w-full object-cover" />
							<div class="absolute inset-0 bg-primary/10"></div>
						</div>
					</Motion>

					<div
						class="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-primary/5 blur-3xl"
					></div>
				</div>
			</Motion>
		</div>
	</div>
</section>

<style>
	@keyframes tm-float-slow {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}

	@keyframes tm-float-medium {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) rotate(-180deg);
		}
	}

	:global(.animate-tm-float-slow) {
		animation: tm-float-slow 8s ease-in-out infinite;
	}

	:global(.animate-tm-float-medium) {
		animation: tm-float-medium 6s ease-in-out infinite;
	}
</style>
