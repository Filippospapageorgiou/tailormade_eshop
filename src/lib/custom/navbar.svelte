<script lang="ts">
	let logo = $state('/logo.png');
	let isMenuOpen = $state(false);

	const menuItems = $state([
		{ title: 'Franchise', path: '/' },
		{ title: 'Shop', path: '/' },
		{ title: 'Pricing', path: '/' },
		{ title: 'About', path: '/' },
		{ title: 'Blog', path: '/' }
	]);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header>
	<nav class="fixed z-20 w-full px-2">
		<div
			class="mx-auto mt-4 max-w-6xl rounded-2xl border bg-background/50 px-6 backdrop-blur-sm lg:px-12"
		>
			<div class="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
				<div class="flex w-full justify-between lg:w-auto">
					<a href="/" class="flex-shrink-0">
						<div class="flex items-center">
							<div
								class="relative h-12 w-26 transition-all duration-300 ease-in-out hover:scale-105"
							>
								<img src={logo} alt="logo company" />
							</div>
						</div>
					</a>
				</div>
				<div class="absolute inset-0 m-auto hidden size-fit lg:block">
					<ul class="flex gap-8 text-sm">
						{#each menuItems as item}
							<li>
								<a
									href={item.path}
									class="block text-muted-foreground duration-150 hover:text-accent-foreground"
									><span>{item.title}</span></a
								>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
					<a
						class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-8 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-linear-to-t from-muted to-background px-3 text-xs font-medium whitespace-nowrap shadow-xs shadow-zinc-950/10 transition-colors duration-200 hover:to-muted focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-border dark:from-muted/50 dark:hover:to-muted/50"
						href="/">Login</a
					><a
						class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-8 items-center justify-center gap-2 rounded-md border border-primary bg-radial-[at_52%_-52%] from-primary/70 to-primary/95 px-3 text-xs font-medium whitespace-nowrap text-primary-foreground shadow-md ring-0 inset-shadow-2xs shadow-zinc-950/30 inset-shadow-white/25 transition-[filter] duration-200 **:[text-shadow:0_1px_0_var(--color-primary)] hover:brightness-125 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden active:brightness-95 disabled:pointer-events-none disabled:opacity-50 dark:border-0 dark:from-primary dark:to-primary/70 dark:inset-shadow-white dark:hover:to-primary"
						href="/">Sign Up</a
					><a
						class="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hidden h-8 items-center justify-center gap-2 rounded-md border border-primary bg-radial-[at_52%_-52%] from-primary/70 to-primary/95 px-3 text-xs font-medium whitespace-nowrap text-primary-foreground shadow-md ring-0 inset-shadow-2xs shadow-zinc-950/30 inset-shadow-white/25 transition-[filter] duration-200 **:[text-shadow:0_1px_0_var(--color-primary)] hover:brightness-125 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden active:brightness-95 disabled:pointer-events-none disabled:opacity-50 dark:border-0 dark:from-primary dark:to-primary/70 dark:inset-shadow-white dark:hover:to-primary"
						href="/">Get Strated</a
					>
				</div>
			</div>
		</div>
	</nav>
</header>
