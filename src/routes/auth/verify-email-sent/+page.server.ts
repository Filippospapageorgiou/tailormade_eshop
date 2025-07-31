import { fail,redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user, session } }) => {
    if(user && session){
        return redirect(303,'/')
    }
}

export const actions: Actions = {
	resend: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return fail(400, { error: 'Email is required' });
		}

		// Resend confirmation email
		const { error } = await supabase.auth.resend({
			type: 'signup',
			email: email,
			options: {
				emailRedirectTo: `${url.origin}/auth/confirm`,
			}
		});

		if (error) {
			return fail(400, { error: error.message });
		}

		return { success: true };
	}
};