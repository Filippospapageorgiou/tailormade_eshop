<script lang="ts">
	import { Motion, useAnimation } from 'svelte-motion';
	import { onMount } from 'svelte';
	import { ArrowRight, Coffee } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let titleControls = useAnimation();
	let subtitleControls = useAnimation();
	let photoControls = useAnimation();
	let mounted = $state(false);

	// Staggered text animation
	const words = ['Sourced', 'Roasted', 'Delivered'];
	let visibleWords = $state<number[]>([]);

	onMount(async () => {
		mounted = true;
		
		// Animate title
		await titleControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' }
		});

		// Animate words one by one
		for (let i = 0; i < words.length; i++) {
			visibleWords = [...visibleWords, i];
			await new Promise(resolve => setTimeout(resolve, 300));
		}

		// Animate subtitle
		await subtitleControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 }
		});

		// Animate photos
		photoControls.start({
			opacity: 1,
			scale: 1,
			transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.1 }
		});
	});

	// Photo grid items with different sizes
	const photos = [
		{ src: '/tailor1.png', alt: 'Mountain landscape', size: 'large' },
		{ src: '/tailor2.png', alt: 'Coffee farm sunset', size: 'medium' },
		{ src: '/tailor3.png', alt: 'Natural scenery', size: 'medium' },
		{ src: '/tailor4.png', alt: 'Autumn landscape', size: 'small' }
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

<section class="relative min-h-screen flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
	<!-- Subtle background gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5"></div>
	
	<!-- Floating coffee beans decoration (subtle) -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 right-10 w-2 h-2 bg-primary/20 rounded-full animate-float-slow"></div>
		<div class="absolute top-40 left-20 w-3 h-3 bg-primary/15 rounded-full animate-float-medium"></div>
		<div class="absolute bottom-40 right-40 w-2 h-2 bg-primary/10 rounded-full animate-float-slow"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto w-full">
		<div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
			<!-- Text Content -->
			<div class="space-y-8">
				<Motion
					initial={{ opacity: 0, y: 20 }}
					animate={titleControls}
					let:motion
				>
					<div use:motion class="space-y-6">
						<!-- Main Title -->
						<h1 class="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
							Artisan Coffee,
							<span class="block text-primary font-normal mt-2">
								{#each words as word, i}
									<span 
										class="inline-block transition-all duration-500 {visibleWords.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
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

				<Motion
					initial={{ opacity: 0, y: 20 }}
					animate={subtitleControls}
					let:motion
				>
					<div use:motion class="space-y-8">
						<!-- Subtitle -->
						<p class="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
							From the world's finest coffee regions to your doorstep. 
							Experience the journey in every cup.
						</p>

						<!-- CTA Buttons -->
						<div class="flex flex-col sm:flex-row gap-4">
							<Motion
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								let:motion
							>
								<Button 
									class="btn-coffee px-8 py-6 text-base group"
								>
									Explore Collection
									<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</Motion>
							
							<Motion
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								let:motion
							>
								<Button 
									variant="outline"
									class="px-8 py-6 text-base border-2"
								>
									Our Story
								</Button>
							</Motion>
						</div>

						<!-- Trust Badges -->
						<div class="flex flex-wrap gap-6 text-sm text-muted-foreground pt-4">
							<span class="flex items-center gap-2">
								<Coffee class="h-4 w-4 text-primary" />
								Family Owned
							</span>
							<span class="flex items-center gap-2">
								<Coffee class="h-4 w-4 text-primary" />
								Small Batch
							</span>
							<span class="flex items-center gap-2">
								<Coffee class="h-4 w-4 text-primary" />
								Ethically Sourced
							</span>
						</div>
					</div>
				</Motion>
			</div>

			<!-- Photo Grid -->
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
					<!-- Photo 1 - Large -->
					<Motion
						custom={0}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? "visible" : "hidden"}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div 
							use:motion
							class="absolute top-0 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-xl"
						>
							<img 
								src={photos[0].src}
								alt="Mountain coffee origin"
								class="w-full h-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
						</div>
					</Motion>

					<!-- Photo 2 - Medium -->
					<Motion
						custom={1}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? "visible" : "hidden"}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div 
							use:motion
							class="absolute top-8 right-0 w-[48%] h-[40%] rounded-2xl overflow-hidden shadow-lg"
						>
							<img 
								src={photos[1].src}
								alt="Coffee farm landscape"
								class="w-full h-full object-cover"
							/>
						</div>
					</Motion>

					<!-- Photo 3 - Medium -->
					<Motion
						custom={2}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? "visible" : "hidden"}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div 
							use:motion
							class="absolute bottom-0 left-8 w-[45%] h-[38%] rounded-2xl overflow-hidden shadow-lg"
						>
							<img 
								src={photos[2].src}
								alt="Natural scenery"
								class="w-full h-full object-cover"
							/>
						</div>
					</Motion>

					<!-- Photo 4 - Small accent -->
					<Motion
						custom={3}
						variants={photoVariants}
						initial="hidden"
						animate={mounted ? "visible" : "hidden"}
						whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						let:motion
					>
						<div 
							use:motion
							class="absolute bottom-12 right-4 w-[35%] h-[30%] rounded-2xl overflow-hidden shadow-md"
						>
							<img 
								src={photos[3].src}
								alt="Coffee journey"
								class="w-full h-full object-cover"
							/>
							<div class="absolute inset-0 bg-primary/10"></div>
						</div>
					</Motion>

					<!-- Decorative element -->
					<div class="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
				</div>
			</Motion>
		</div>
	</div>
</section>

<style>
	@keyframes float-slow {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(180deg); }
	}
	
	@keyframes float-medium {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(-180deg); }
	}
	
	:global(.animate-float-slow) {
		animation: float-slow 8s ease-in-out infinite;
	}
	
	:global(.animate-float-medium) {
		animation: float-medium 6s ease-in-out infinite;
	}
</style>