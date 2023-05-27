<script>
    import { getDB } from "../firebase"
    import { collection, getDocs } from "firebase/firestore"
    const { db } = getDB()

    let data = ""

    // basic boilerplate for hello world!
    export async function getData() {
        const userCollection = collection(db, 'users')
        const { docs } = await getDocs(userCollection) //  a snapshot are all documents in a collection

        docs.forEach(doc => {
           const docData = doc.data()
           data = docData.username

           //console.log(data)
        })
    }

    export {data as data}
</script>

<button on:click={getData}>Get Firebase DATA</button>
<p>{data}</p>
