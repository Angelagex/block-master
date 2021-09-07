import { db } from '../firebase/firebase-config'

export const loadMovies = async (uid) => {

    const movieStore = await db.collection(`${uid}/movies/data`).get()
    const moviesList = [];

    movieStore.forEach(item=>{
        moviesList.push({
        id:item.id,
        ...item.data()
       })
    })
   
    return moviesList
}