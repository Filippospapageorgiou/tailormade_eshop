<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from "$lib/stores/toast.svelte";

	
	let { form } = $props();

  	$effect(() =>{
        if(form?.error){
              toast.show = true;
              toast.status = false;
              toast.title = 'Error';
			  toast.text = form?.error ?? "";
        }
    })

	let loading:boolean = $state(false);
</script>

<div class="flex min-h-screen flex-col md:flex-row">
	<div class="relative hidden items-center justify-center bg-white md:flex md:w-1/2">
		<div class="max-h-96 max-w-96">
			<img src="/auth.jpg" alt="Tailor Made Coffee Roasters" class="h-full w-full object-contain" />
		</div>
	</div>

	<!-- Right side - Form -->
	<div class="flex min-h-screen w-full items-center justify-center bg-background p-4 md:w-1/2">
		<div class="w-full max-w-md space-y-8 rounded-xl border border-border/50 bg-card p-8 shadow-lg">
			<div class="text-center">
				<h1 class="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
				<p class="mt-2 text-sm text-muted-foreground">
					Enter your email below to create your account
				</p>
			</div>

			<!-- Social Login Buttons -->
			<div class="space-y-3">
				<Button 
					variant="outline" 
					class="w-full border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
					type="button"
				>
					<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
					Facebook
				</Button>
				
				<Button 
					variant="outline" 
					class="w-full border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
					type="button"
				>
					<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
					</svg>
					Google
				</Button>
			</div>

			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t border-border"></span>
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-card px-2 text-muted-foreground font-medium">OR CONTINUE WITH</span>
				</div>
			</div>

			<!-- Form -->
			<form 
				method="POST" use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="space-y-6">
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="email" class="text-foreground font-medium">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							value={form?.email || ''}
							class="coffee-input h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="password" class="text-foreground font-medium">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							class="coffee-input h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
							required						
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<a href="/auth/forgot-password" class="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200">
						Forgot password?
					</a>
				</div>

				<Button type="submit" class="w-full btn-coffee h-10 font-medium" disabled={loading}>
					{#if loading}
						<div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
						login in....
					{:else}
						Login
					{/if}
				</Button>

				<div class="text-center text-sm">
					<span class="text-muted-foreground">Don't have an account? </span>
					<a href="/auth/signup" class="text-primary hover:text-primary/80 hover:underline transition-colors duration-200 font-medium">Sign up</a>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>