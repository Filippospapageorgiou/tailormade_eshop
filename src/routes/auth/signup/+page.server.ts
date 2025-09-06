import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupSchema } from '$lib/schemas/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, session } }) => {
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

		//handle error if the email already exists
		const { data: userExists, error:rpcError } = await supabase.rpc('user_exists', {
			email_to_check: email
		})

		if(rpcError) { 
			console.error('RPC Error:', rpcError);
			return fail(500,{
				error:"Something went wrong checking for the user. Pleasy try again later.",
				email,
			})
		}

		if (userExists) {
            return fail(400, {
                error: 'An account with this email already exists. Please try logging in.',
                email,
            });
        }

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
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