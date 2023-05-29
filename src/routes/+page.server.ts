import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    console.log(locals.user)

    if (locals.user == undefined) {
        console.log("as")

        throw redirect(302, "/login")
    }
    return locals

}) satisfies PageServerLoad;