<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from '$lib/stores/toast.svelte';

	let { form } = $props();

	$effect(() => {
		if (form?.error) {
			toast.show = true;
			toast.status = false;
			toast.title = 'Error';
			toast.text = form?.error ?? '';
		}
	});

	let loading = $state(false);
</script>

<div class="flex min-h-screen flex-col md:flex-row">
	<div class="relative hidden items-center justify-center bg-white md:flex md:w-1/2">
		<div class="max-h-96 max-w-96">
			<img src="/auth.jpg" alt="Tailor Made Coffee Roasters" class="h-full w-full object-contain" />
		</div>
	</div>

	<!-- Right side - Form -->
	<div class="flex min-h-screen w-full items-center justify-center bg-background p-4 md:w-1/2">
		<div class="w-full max-w-sm space-y-8">
			<div class="text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="mt-2 text-sm text-muted-foreground">Join us for the finest coffee experience</p>
			</div>
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="space-y-6"
			>
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							value={form?.email || ''}
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="password">Password</Label>
						<Input id="password" name="password" type="password" placeholder="••••••••" required />
					</div>

					<div class="space-y-2">
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="••••••••"
							required
						/>
					</div>
				</div>

				<Button type="submit" class="w-full" disabled={loading}>
					{loading ? 'Creating account...' : 'Sign up'}
				</Button>

				<div class="text-center text-sm">
					<span class="text-muted-foreground">Already have an account? </span>
					<a href="/auth/login" class="text-primary hover:underline">Sign in</a>
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
