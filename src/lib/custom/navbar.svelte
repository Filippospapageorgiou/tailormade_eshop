<script lang="ts">
	import { Motion, useAnimation } from 'svelte-motion';
	import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import CoffeeAvatar from './CoffeeAvatar.svelte';

	let { data } = $props();

	let logo = $state('/logo.png');
	let isMenuOpen = $state(false);
	let isOpen:boolean = $state(false);

	// Get user from data
	const { user } = $derived(data);

	const menuItems = $state([
		{ title: 'Franchise', path: '/', hasDropdown: false },
		{ title: 'Shop', path: '/', hasDropdown: true },
		{ title: 'Locations', path: '/', hasDropdown: false },
		{ title: 'About', path: '/', hasDropdown: false },
		{ title: 'Blog', path: '/', hasDropdown: false }
	]);

	// Animation controls
	let menuControls = useAnimation();
	menuControls.start('closed');
	let logoControls = useAnimation();

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		isOpen = false;
		if (isMenuOpen) {
			menuControls.start('open');
		} else {
			menuControls.start('closed');
		}
	}

	$effect(() => {
		if(isOpen === true){
			isMenuOpen = false;
			menuControls.start('closed');
		}
	})

	// Menu animation variants - Fixed timing and initial state
	let menuVariants = {
		open: {
			opacity: 1,
			height: 'auto',
			display: 'block',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
				staggerChildren: 0.08,
				delayChildren: 0.1
			}
		},
		closed: {
			opacity: 0,
			height: 0,
			transitionEnd: {
				display: 'none'
			},
			transition: {
				duration: 0.25,
				ease: 'easeIn',
				staggerChildren: 0.05,
				staggerDirection: -1
			}
		}
	};

	let menuItemVariants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.25,
				ease: 'easeOut'
			}
		},
		closed: {
			y: -15,
			opacity: 0,
			transition: {
				duration: 0.2
			}
		}
	};
</script>

<header class="relative z-50">
	<nav class="fixed top-0 z-20 w-full px-2 sm:px-4">
		<Motion
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			let:motion
		>
			<div
				use:motion
				class="mx-auto mt-4 max-w-7xl rounded-2xl border border-border/50 bg-background/80 px-4 shadow-lg backdrop-blur-md lg:px-8"
			>
				<div class="relative flex items-center justify-between py-3 lg:py-4">
					<Motion
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						animate={logoControls}
						let:motion
					>
						<a href="/" class="flex-shrink-0" use:motion>
							<div class="flex items-center">
								<div
									class="relative h-10 w-24 transition-all duration-300 ease-in-out sm:h-12 sm:w-28"
								>
									<img src={logo} alt="logo company" class="h-full w-full object-contain" />
								</div>
							</div>
						</a>
					</Motion>

					<!-- Desktop Menu -->
					<div class="hidden lg:block">
						<ul class="flex items-center gap-8 text-sm">
							{#each menuItems as item, index}
								<Motion
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									whileHover={{ y: -2 }}
									let:motion
								>
									<li use:motion>
										<a
											href={item.path}
											class="group relative flex items-center gap-1 text-muted-foreground transition-all duration-300 hover:text-foreground"
										>
											<span class="relative">
												{item.title}
												<span
													class="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
												></span>
											</span>
											{#if item.hasDropdown}
												<ChevronDown
													size={14}
													class="transition-transform duration-200 group-hover:rotate-180"
												/>
											{/if}
										</a>
									</li>
								</Motion>
							{/each}
						</ul>
					</div>

					<!-- Right Side: Avatar/Auth + Cart + Mobile Menu -->
					<div class="flex items-center gap-3">
						{#if user}
						<!-- Cart for non-logged users on desktop -->
							<div class="hidden lg:block">
								<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} let:motion>
									<button
										use:motion
										class="relative rounded-md p-2 transition-colors duration-200 hover:bg-muted focus:ring-2 focus:ring-primary/50 focus:outline-none"
										aria-label="Shopping cart"
									>
										<ShoppingCart size={20} class="text-foreground" />
										<span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
											0
										</span>
									</button>
								</Motion>
							</div>
							<!-- User Avatar - Logged in state -->
							<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} let:motion>
								<button use:motion class="flex items-center gap-2 focus:outline-none">
									<CoffeeAvatar 
										src={user.user_metadata?.avatar_url} 
										alt={user.email || 'User'} 
										{user}
										size="default"
										bind:isOpen={isOpen}
									/>
								</button>
							</Motion>
						{:else}
							<!-- Cart for non-logged users on desktop -->
							<div class="hidden lg:block">
								<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} let:motion>
									<button
										use:motion
										class="relative rounded-md p-2 transition-colors duration-200 hover:bg-muted focus:ring-2 focus:ring-primary/50 focus:outline-none"
										aria-label="Shopping cart"
									>
										<ShoppingCart size={20} class="text-foreground" />
										<span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
											0
										</span>
									</button>
								</Motion>
							</div>
							<!-- Auth Buttons - Desktop ONLY when not logged in -->
							<div class="hidden items-center gap-3 lg:flex">
								<Motion whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} let:motion>
									<a
										use:motion
										class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-8 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-linear-to-t from-muted to-background px-3 text-xs font-medium whitespace-nowrap shadow-xs shadow-zinc-950/10 transition-colors duration-200 hover:to-muted focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-border dark:from-muted/50 dark:hover:to-muted/50"
										href="/auth/login">Login</a
									>
								</Motion>

								<Motion
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									let:motion
								>
									<a
										use:motion
										class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-8 items-center justify-center gap-2 rounded-md border border-primary bg-radial-[at_52%_-52%] from-primary/70 to-primary/95 px-3 text-xs font-medium whitespace-nowrap text-primary-foreground shadow-md ring-0 inset-shadow-2xs shadow-zinc-950/30 inset-shadow-white/25 transition-[filter] duration-200 **:[text-shadow:0_1px_0_var(--color-primary)] hover:brightness-125 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden active:brightness-95 disabled:pointer-events-none disabled:opacity-50 dark:border-0 dark:from-primary dark:to-primary/70 dark:inset-shadow-white dark:hover:to-primary"
										href="/auth/signup">Sign Up</a
									>
								</Motion>
							</div>
						{/if}

						<!-- Mobile Menu Button -->
						<Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} let:motion>
							<button
								use:motion
								onclick={toggleMenu}
								class="rounded-md p-2 transition-colors duration-200 hover:bg-muted focus:ring-2 focus:ring-primary/50 focus:outline-none lg:hidden"
								aria-label="Toggle menu"
							>
								{#if isMenuOpen}
									<X size={24} class="text-foreground" />
								{:else}
									<Menu size={24} class="text-foreground" />
								{/if}
							</button>
						</Motion>
					</div>
				</div>

				<!-- Mobile Menu - Fixed initial state -->
				<Motion 
					animate={menuControls} 
					variants={menuVariants} 
					initial="closed"
					style={{ display: 'none' }}
					let:motion
				>
					<div
						use:motion
						class={cn(
							'overflow-hidden border-t border-border/30 lg:hidden'
						)}
					>
						<div class="space-y-4 px-4 py-6">
							<!-- Mobile Menu Items -->
							{#each menuItems as item, index}
								<Motion variants={menuItemVariants} custom={index} let:motion>
									<div use:motion>
										<a
											href={item.path}
											class="block text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
											onclick={() => {
												isMenuOpen = false;
												menuControls.start('closed');
											}}
										>
											{item.title}
										</a>
									</div>
								</Motion>
							{/each}
							<!-- Mobile Auth Buttons - Only show when not logged in -->
							{#if !user}
								<Motion variants={menuItemVariants} custom={menuItems.length} let:motion>
									<div use:motion class="flex flex-col gap-3 pt-4 border-t border-border/30">
										<a
											class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-linear-to-t from-muted to-background px-3 text-sm font-medium whitespace-nowrap shadow-xs shadow-zinc-950/10 transition-colors duration-200 hover:to-muted focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-border dark:from-muted/50 dark:hover:to-muted/50"
											href="/auth/login"
											onclick={() => {
												isMenuOpen = false;
												menuControls.start('closed');
											}}
											>Login</a
										>
										<a
											class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-primary bg-radial-[at_52%_-52%] from-primary/70 to-primary/95 px-3 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-md ring-0 inset-shadow-2xs shadow-zinc-950/30 inset-shadow-white/25 transition-[filter] duration-200 **:[text-shadow:0_1px_0_var(--color-primary)] hover:brightness-125 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden active:brightness-95 disabled:pointer-events-none disabled:opacity-50 dark:border-0 dark:from-primary dark:to-primary/70 dark:inset-shadow-white dark:hover:to-primary"
											href="/auth/signup"
											onclick={() => {
												isMenuOpen = false;
												menuControls.start('closed');
											}}
											>Sign Up</a
										>
									</div>
								</Motion>
							{/if}
							<Motion variants={menuItemVariants} custom={menuItems.length} let:motion>
									<div use:motion class="flex flex-col gap-3">
										<button
											class="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
											onclick={() => {
												isMenuOpen = false;
												menuControls.start('closed');
											}}
										>
											<ShoppingCart size={16} />
											Cart (0)
										</button>
									</div>
							</Motion>
						</div>
					</div>
				</Motion>
			</div>
		</Motion>
	</nav>
</header>