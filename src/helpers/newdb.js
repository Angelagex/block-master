export const newdb = async (user) => {

    const movUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=4af50007c18dec110dc0b6a86966a25a&language=es-MX&page=1'
    const uid = user.uid
    import { db } from '../firebase/firebase-config'

    try {
        const resp = await fetch(movUrl)

        if(resp.ok){
            const data = await resp.json()
            const result = data.results
            await db.collection(`${uid}/Movies/data`).add(result)
        } else {
            throw await resp.json();
        }
    } catch (error) {
       throw error;
    }
}