import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { getDB } from "../firebase"
import { doc, getDoc } from "firebase/firestore";

export const load = (async ({ locals, cookies }) => {

  if (locals.user == undefined) {
    throw redirect(303, "/login ");
  }

  const { db } = getDB()

  const docRef = doc(db, "grades", locals.user.id)
  const document = (await getDoc(docRef)).data()

  if (document == undefined) {

    cookies.set("FirstTimeSetup", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    throw redirect(303, "/setup")
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
