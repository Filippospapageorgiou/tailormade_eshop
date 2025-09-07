import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginSchema } from '$lib/schemas/auth';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals: { supabase, user, session } }) => {
    if(user && session){
        return redirect(303,'/')
    }
}

export const actions: Actions = {
    loginWithEmail :async({request, locals:{ supabase }}) =>{
        const formData = await request.formData();

        const email = formData.get('email') as string;
		const password = formData.get('password') as string;

        const result = loginSchema.safeParse({email, password});
    
        if(!result.success){
            return fail(400,{
                error:result.error?.issues?.[0]?.message ?? "",
                email
            })
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if(error){
            return fail(400,{
                error:error.message,
                email
            });
        }

        redirect(303,'/');
    },

    loginWithGoogle: async({locals: {supabase}, url}) => {
        const {data , error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options:{
                // This is the URL that Supabase will redirect the user back to after authentication.
				// It must match the site URL configured in your Supabase project.
				redirectTo: `${url.origin}/auth/callback`
            }
        });

        if(error){
            console.error('Error logging in with Google:' ,error);
            return fail(400, {
                error: 'Could not log in with Google. Please try again.'
            });
        }

        if(data.url){
            redirect(303, data.url)
        }
    },
    loginWithFacebook: async ({ locals: { supabase }, url }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'facebook',
			options: {
				redirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			console.error('Error logging in with Facebook:', error);
			return fail(400, { error: 'Could not log in with Facebook. Please try again.' });
		}

		if (data.url) {
			redirect(303, data.url);
		}
	}
}