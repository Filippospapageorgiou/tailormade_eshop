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
    default :async({request, locals:{ supabase }}) =>{
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
    }
}