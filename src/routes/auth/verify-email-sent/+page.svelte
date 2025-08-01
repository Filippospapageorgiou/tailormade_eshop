<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Mail, ArrowLeft, RefreshCw, Coffee, CheckCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let email = $derived(page.url.searchParams.get('email') || '');
	let loading = $state(false);
	let resent = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center bg-background p-4">
	<div class="w-full max-w-md space-y-8">
		<!-- Success Icon with Coffee Theme -->
		<div class="text-center">
			<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 relative">
				<Mail class="h-8 w-8 text-primary animate-pulse" />
				<div class="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
					<CheckCircle class="h-3 w-3 text-primary-foreground" />
				</div>
			</div>
			<h1 class="text-2xl font-semibold tracking-tight text-foreground">Check your email</h1>
			<p class="mt-2 text-sm text-muted-foreground">
				We've sent a verification link to
			</p>
			{#if email}
				<p class="mt-1 font-medium text-primary break-all">{email}</p>
			{/if}
		</div>

		<!-- Instructions Card with Coffee Theme -->
		<div class="rounded-xl border border-border/50 bg-card p-6 space-y-4 product-card">
			<div class="flex items-center gap-2 justify-center mb-4">
				<Coffee class="h-5 w-5 text-primary" />
				<h2 class="font-medium text-foreground">What's next?</h2>
			</div>
			<ol class="space-y-4 text-sm">
				<li class="flex gap-3 items-start">
					<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
					<div>
						<p class="font-medium text-foreground">Check your email inbox</p>
						<p class="text-muted-foreground mt-1">Don't forget to check your spam folder too</p>
					</div>
				</li>
				<li class="flex gap-3 items-start">
					<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
					<div>
						<p class="font-medium text-foreground">Click the verification link</p>
						<p class="text-muted-foreground mt-1">This will confirm your email address</p>
					</div>
				</li>
				<li class="flex gap-3 items-start">
					<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
					<div>
						<p class="font-medium text-foreground">Welcome to our coffee family!</p>
						<p class="text-muted-foreground mt-1">You'll be redirected to start your coffee journey</p>
					</div>
				</li>
			</ol>
		</div>

		<!-- Resend Form -->
		{#if email}
			<form 
				method="POST"
				action="/auth/verify-email-sent?/resend"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							resent = true;
							setTimeout(() => resent = false, 5000);
						}
					};
				}}
				class="space-y-4"
			>
				<input type="hidden" name="email" value={email} />
				
				{#if resent}
					<div class="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
						<div class="flex items-center justify-center gap-2 mb-2">
							<CheckCircle class="h-4 w-4 text-primary" />
							<span class="text-sm font-medium text-primary">Email sent successfully!</span>
						</div>
						<p class="text-xs text-muted-foreground">Please check your inbox for the new verification email.</p>
					</div>
				{/if}

				<Button 
					type="submit" 
					variant="outline" 
					class="w-full border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 h-10" 
					disabled={loading || resent}
				>
					{#if loading}
						<RefreshCw class="mr-2 h-4 w-4 animate-spin" />
						Sending...
					{:else}
						<Mail class="mr-2 h-4 w-4" />
						Resend verification email
					{/if}
				</Button>
			</form>
		{/if}

		<!-- Footer Links with Coffee Theme -->
		<div class="space-y-4 text-center text-sm">
			<div class="p-4 bg-muted/30 rounded-lg border border-border/30">
				<p class="text-muted-foreground mb-2">
					<Coffee class="inline h-4 w-4 mr-1" />
					Already verified your email?
				</p>
				<a href="/auth/login" class="text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200">
					Sign in to your account
				</a>
			</div>
			
			<a 
				href="/auth/signup" 
				class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
			>
				<ArrowLeft class="h-3 w-3" />
				Back to sign up
			</a>
		</div>
	</div>
</div>