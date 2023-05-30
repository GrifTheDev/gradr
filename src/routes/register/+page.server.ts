import { redirect, type Actions } from "@sveltejs/kit";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { sha256 } from "js-sha256";
import { getDB } from "../../firebase";
import jwt from "jsonwebtoken";
import { config } from "../../../config";
import type { PageServerLoad } from "./$types";

async function generateId(len: number): Promise<string> {
  const choose: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ1234567890";
  let final: string = "";

  for (let i = 0; i < len; i++) {
    final += choose[Math.floor(Math.random() * choose.length)];
  }

  return final;
}

async function validatePswd(pswd: string) {
    if (pswd.length < 8) 
        return { code: 422, message: "The password you have provided is too short. Please create a password that is 8 or more characters long." }


    return 0
}

export const load = (async ({ locals }) => {
  if (locals.user != undefined) {
    throw redirect(303, "/");
  }
}) satisfies PageServerLoad;

export const actions = {
  register: async ({ cookies, request }) => {
    const formData = await request.formData();

    const username: string = formData.get("username")?.toString() || "empty";
    const email: string = formData.get("email")?.toString() || "empty";
    const password: string = formData.get("password")?.toString() || "empty";
    const confirmPassword: string =
      formData.get("confirm-password")?.toString() || "empty";

    if (
      email == "empty" ||
      username == "empty" ||
      password == "empty" ||
      confirmPassword == "empty"
    )
      return {
        code: 400,
        message: "Please input data into all fields before clicking submit.",
      };

    // E-mail does not contain @something.com
    if (email.split("@").length < 2)
      return { code: 422, message: "Invalid e-mail." };
    // The part after @ in the email does not contain a .
    if (email.split("@")[1].split(".").length < 2)
      return { code: 422, message: "Invalid e-mail." };
    if (password != confirmPassword)
      return { code: 400, message: "Passwords do not match." };

    const validation = await validatePswd(password)

    if (validation != 0) 
        return validation

    const { db } = getDB();
    const sha256Email = sha256(email);

    const docRef = doc(db, "users", sha256Email);
    const userData = await (await getDoc(docRef)).data();

    if (userData != undefined)
      return {
        code: 409,
        message: `An account with the e-mail ${email} already exists. Would you like to log in?`,
      };

    const sha256Pswd = sha256(password);
    const userId = await generateId(16);

    const toDB = {
      username: username,
      password: sha256Pswd,
      id: userId,
    };

    await setDoc(docRef, toDB);

    const token = jwt.sign(
      {
        email: sha256Email,
        username: username,
        id: userId,
      },
      config.jwt_secret,
      {
        expiresIn: "7d",
      }
    );

    cookies.set("AuthorizationToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(303, "/");
  },
} satisfies Actions;
