<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Mail, ArrowLeft, RefreshCw } from 'lucide-svelte';
	import { enhance } from '$app/forms';


	let email = $derived(page.url.searchParams.get('email') || '');
	let loading = $state(false);
	let resent = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center bg-background p-4">
	<div class="w-full max-w-md space-y-8">
		<!-- Success Icon -->
		<div class="text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
				<Mail class="h-8 w-8 text-primary animate-pulse" />
			</div>
			<h1 class="text-2xl font-semibold tracking-tight">Check your email</h1>
			<p class="mt-2 text-sm text-muted-foreground">
				We've sent a verification link to
			</p>
			{#if email}
				<p class="mt-1 font-medium text-foreground">{email}</p>
			{/if}
		</div>

		<!-- Instructions Card -->
		<div class="rounded-lg border border-border bg-card p-6 space-y-4">
			<h2 class="font-medium text-center">What's next?</h2>
			<ol class="space-y-3 text-sm text-muted-foreground">
				<li class="flex gap-3">
					<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</span>
					<span>Check your email inbox (and spam folder)</span>
				</li>
				<li class="flex gap-3">
					<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</span>
					<span>Click the verification link in the email</span>
				</li>
				<li class="flex gap-3">
					<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</span>
					<span>You'll be redirected back to sign in</span>
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
					<div class="rounded-md bg-primary/10 p-3 text-center text-sm text-primary">
						Verification email resent! Please check your inbox.
					</div>
				{/if}

				<Button 
					type="submit" 
					variant="outline" 
					class="w-full" 
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

		<!-- Footer Links -->
		<div class="space-y-3 text-center text-sm">
			<div>
				<span class="text-muted-foreground">Already verified? </span>
				<a href="/auth/login" class="text-primary hover:underline">
					Sign in
				</a>
			</div>
			
			<a 
				href="/auth/signup" 
				class="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft class="h-3 w-3" />
				Back to sign up
			</a>
		</div>
	</div>
</div>