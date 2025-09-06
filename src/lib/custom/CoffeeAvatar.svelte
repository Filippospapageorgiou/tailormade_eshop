<script lang="ts">
	import { cn } from '$lib/utils';
    import { Motion, useAnimation, animate } from "svelte-motion";
    	import {
        ShoppingBasket,
        LogOutIcon,
        UserCircleIcon,
        Loader2
    } from "lucide-svelte";

    let items = [
        { icon: UserCircleIcon, name : "My Account", href: "/account" },
        { icon: ShoppingBasket, name : "My Orders", href: "/orders"},
        {
            icon: LogOutIcon,
            name: "Logout",
            customStyle:
            "!text-red-500 cursor-pointer hover:bg-red-500/10 w-full focus-visible:text-red-500 focus-visible:bg-red-500/10 focus-visible:border-red-500/10",
        },
    ];

    
    let isLoggingOut = $state(false);

     //  Ui List
    let list = {
        visible: {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
             transition: {
                type: "spring",
                bounce: 0.15,
                duration: 0.4,
            },
        },
        hidden: {
            clipPath: "inset(10% 50% 90% 50% round 16px)",
            transition: {
                duration: 0.25,
                type: "spring",
                bounce: 0,
            },
        },
    };

    let variants = {
        visible: (i:any) => ({
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.25,
                delay: i * 0.08,
                ease: "easeOut",
            },
         }),
        hidden: {
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
            transition: {
                duration: 0.15,
            },
        },
    };
	
	let {
		src,
		alt = "User",
		size = "default",
		class: className,
		user,
		isOpen = $bindable(),
		...restProps
	}: {
		src?: string;
		alt?: string;
		size?: "sm" | "default" | "lg";
		class?: string;
		user?: any;
		isOpen:boolean
	} = $props();


    async function handleLogout() {
        if(isLoggingOut) {return true;}

        isLoggingOut = true;
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Error logging out');
            }
            
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
            isLoggingOut = false; 
        }
    }

	// Get user initials for fallback
	const getInitials = (user: any) => {
		if (user?.user_metadata?.full_name) {
			return user.user_metadata.full_name
				.split(' ')
				.map((name: string) => name.charAt(0).toUpperCase())
				.join('')
				.slice(0, 2);
		}
		if (user?.email) {
			return user.email.charAt(0).toUpperCase();
		}
		return 'U';
	};

	const sizeClasses = {
		sm: "h-6 w-6 text-xs",
		default: "h-8 w-8 text-sm",
		lg: "h-10 w-10 text-base"
	};

	// Handle clicking on avatar to toggle dropdown
	const handleAvatarClick = () => {
        if (isLoggingOut) return;
		isOpen = !isOpen;
	};
</script>

<!-- Wrapper container for positioning the dropdown -->
<div class="relative inline-block">
	<!-- Avatar with click handler -->
	<Motion
		whileTap={{
			scale: 0.95,
		}}
		let:motion
	>
		<button
			use:motion
			onclick={handleAvatarClick}
			class={cn(
				"relative rounded-full transition-all duration-200 overflow-hidden cursor-pointer",
				// Beautiful gradient border like your buttons
				"bg-gradient-to-br from-primary/20 via-primary/40 to-primary/20 p-0.5",
				// Hover effects
				"hover:from-primary/30 hover:via-primary/50 hover:to-primary/30",
				"hover:scale-105 hover:shadow-md hover:shadow-primary/20",
				// Focus states
				"focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:outline-none",
				sizeClasses[size],
				className
			)}
			{...restProps}
		>
			<!-- Inner container with coffee theme background -->
			<div 
				class={cn(
					"relative h-full w-full rounded-full overflow-hidden",
					// Coffee-themed gradient background
					"bg-gradient-to-br from-muted via-background to-muted/80",
					// Subtle inner shadow for depth
					"shadow-inner"
				)}
			>
				{#if src}
					<!-- User uploaded image -->
					<img 
						{src} 
						{alt}
						class="h-full w-full object-cover"
						loading="lazy"
					/>
				{:else}
					<!-- Fallback with beautiful styling -->
					<div 
						class={cn(
							"h-full w-full flex items-center justify-center",
							// Beautiful gradient background
							"bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10",
							// Text styling to match your buttons
							"font-semibold text-foreground/80",
							// Subtle pattern overlay
							"relative"
						)}
					>
						<!-- Background pattern -->
						<div class="absolute inset-0 opacity-5">
							<div class="h-full w-full bg-gradient-to-br from-primary to-transparent"></div>
						</div>
						
						<!-- User initials or default icon -->
						<span class="relative z-10">
							{getInitials(user)}
						</span>
					</div>
				{/if}
				
				<div 
					class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
				></div>
			</div>
		</button>
	</Motion>

	<!-- Dropdown Menu -->
	<Motion
		animate={isOpen ? "visible" : "hidden"}
		variants={list}
		initial="hidden"
		let:motion
	>
		<ul
			use:motion
			class={cn(
				"absolute left-1/2 top-full mt-3 z-[100] min-w-[180px] -translate-x-1/2 space-y-1 p-3",
				"bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl",
				"before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4",
				"before:bg-background/95 before:border-l before:border-t before:border-border/50 before:rotate-45 before:backdrop-blur-md",
				isOpen ? "pointer-events-auto" : "pointer-events-none"
			)}
		>
			{#each items as item, i}
				<Motion
					custom={i + 1}
					{variants}
					initial="hidden"
					animate={isOpen ? "visible" : "hidden"}
					let:motion
				>
					<li use:motion>
                        {#if item.name === 'Logout'}
                            <button 
                                onclick={handleLogout}
                                disabled={isLoggingOut}
                                class={cn(
								    "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full",
								    "text-red-500 hover:bg-red-500/10",
								    "focus-visible:text-red-500 focus-visible:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
								    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
								    item?.customStyle
							    )}
                            >
                                {#if isLoggingOut}
                                    <Loader2
                                        size={18}
                                        strokeWidth={1.5}
                                        class="shrink-0 animate-spin"
                                    />
                                {:else}
                                    <item.icon
                                        size={18}
                                        strokeWidth={1.5}
                                        class="shrink-0"
                                    />
                                {/if}
                                <span class="text-sm font-medium">
								    {isLoggingOut ? 'Logging out...' : item.name}
							    </span>
                            </button>
                        {:else}
                            <a
							    href={item.href}
							    class={cn(
								    "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
								    "text-foreground/80 hover:text-foreground hover:bg-accent/50",
								    "focus-visible:text-foreground focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
								    item?.customStyle
							    )}
						     >
							    <item.icon
									size={18}
									strokeWidth={1.5}
									class="shrink-0"
								/>
							    <span class="text-sm font-medium">
								    {item.name}
							    </span>
						    </a>
                        {/if}
					</li>
				</Motion>
			{/each}
		</ul>
	</Motion>
</div>