import type { Actions } from "./$types";
import { getDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";
import { config } from "../../../config";

export const actions = {
  login: async ({ cookies, request }) => {
    const formData = await request.formData();
    const email: string = formData.get("email")?.toString() || "empty";
    const password: string = formData.get("password")?.toString() || "empty";

    // Data not submitted into one or more fields
    if (email == "empty" || password == "empty")
      return {
        code: 400,
        message: "Please input data into both fields before clicking submit.",
      };
    // E-mail does not contain @something.com
    if (email.split("@").length < 2)
      return { code: 500, message: "Invalid e-mail." };
    // The part after @ in the email does not contain a .
    if (email.split("@")[1].split(".").length < 2)
      return { code: 500, message: "Invalid e-mail." };

    const sha256Email = sha256(email);
    const sha256Pswd = sha256(password);
    const { db } = getDB();
    const docRef = doc(db, "users", sha256Email);
    const dbData = (await getDoc(docRef)).data();

    // For security reasons, it's better to say invalid username/password, than to mention what is wrong
    if (dbData == undefined)
      return {
        code: 500,
        message: `Invalid username/password.`,
      };

    const dbPswd: string = dbData.password;
    const userId: string = dbData.id;

    if (dbPswd == sha256Pswd) {
      console.log("Logged in!");

      const token = jwt.sign(
        {
          email: sha256Email,
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
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });
      console.log(token)
      return { code: 200 };
    } else {
      return { code: 500, message: "Invalid username/password." };
    }
    // now...
  },
} satisfies Actions;
