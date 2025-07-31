import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupSchema } from '$lib/schemas/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user, session } }) => {
    if(user && session){
        return redirect(303,'/')
    }
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		// Validate form data
		const result = signupSchema.safeParse({ email, password, confirmPassword });
		
		if (!result.success) {
			return fail(400, {
				error: result.error?.issues?.[0]?.message ?? "",
				email,
			});
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/confirm`,
			},
		});

		if (error) {
			return fail(400, {
				error: error.message,
				email,
			});
		}

		// Check if email confirmation is required (Supabase setting)
		if (data.user && !data.session) {
			// User created but needs email confirmation
			// Redirect to verification pending page with email as query param
			redirect(303, `/auth/verify-email-sent?email=${encodeURIComponent(email)}`);
		}

		// If auto-confirm is enabled in Supabase, user will be logged in
		redirect(303, '/');
	},
};