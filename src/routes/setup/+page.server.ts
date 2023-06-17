import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    const cookie = cookies.get("FirstTimeSetup")

    if (cookie == undefined || cookie != "true") {
        throw redirect(303, "/")
    }
}) satisfies PageServerLoad