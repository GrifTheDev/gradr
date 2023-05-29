import type { Actions } from './$types'
import { getDB } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { createCipheriv, createDecipheriv, randomBytes } from "crypto"


export const actions = {
    login: async ({cookies, request}) => {
        const formData = await request.formData()
        const email = formData.get('email') || "a"
        const password = formData.get('password') || ""
        // get secret to be able to sha256 the pswd from firebase

        const { db } = getDB()
        const docRef = doc(db, 'users', email.toString())
        const dbData = await getDoc(docRef)
        let key: string = ""

        if (dbData.data()?.key != null || dbData.data()?.key != undefined) {
            key = dbData.data()?.key
        } else {
            // email doesnt exist in db
        }
        console.log(key)
        const initVector: any = randomBytes(16)
        const cipher = createCipheriv("aes-256-ctr", key, initVector)
        const encryptedPwsd: any = Buffer.concat([cipher.update(password.toString()), cipher.final()])

        console.log(encryptedPwsd.toString('hex')) // iamapass

        const decipher = createDecipheriv("aes-256-ctr", key, Buffer.from(initVector, 'hex'))

        const decry = Buffer.concat([decipher.update(Buffer.from(encryptedPwsd, 'hex')), decipher.final()])

        console.log(decry.toString())
    }
} satisfies Actions