import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
  if (locals.user == undefined) {
    throw redirect(303, "/about");
  }
  return locals;
}) satisfies PageServerLoad;

export const actions = {
    logout: async({cookies, request}) => {
        const cookie = cookies.get("AuthorizationToken")

        if (cookie) {
            cookies.delete("AuthorizationToken")

            throw redirect(303, "/about")
        }
    } 
} satisfies Actions
