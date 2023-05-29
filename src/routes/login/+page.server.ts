import type { Actions } from './$types'
import { getDB } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import {sha256} from "js-sha256"


export const actions = {
    login: async ({cookies, request}) => {
        const formData = await request.formData()
        const email: string = formData.get('email')?.toString() || "empty"
        const password: string = formData.get('password')?.toString() || "empty"

        // Data not submitted into one or more fields
        if (email == "empty" || password == "empty") return { code: 500, message: "Please input data into both fields before clicking submit." }
        // E-mail does not contain @something.com
        if (email.split("@").length < 2) return { code: 500, message: "Invalid e-mail." }
        // The part after @ in the email does not contain a .
        if (email.split("@")[1].split(".").length < 2) return { code: 500, message: "Invalid e-mail." }

        const sha256Email = sha256(email)
        const { db } = getDB()
        const docRef = doc(db, 'users', sha256Email)
        const dbData = (await getDoc(docRef)).data()

        if (dbData == undefined) return {code: 500, message: `Could not find an account registered with the email: ${email}`}

        console.log(dbData)
        // now...
    }
} satisfies Actions