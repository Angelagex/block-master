import Swal from 'sweetalert2'

import { fileUpload } from '../helpers/fileUpload'
import { db } from '../firebase/firebase-config'
import {types} from '../types/types'
import { loadMovies } from '../helpers/loadMovies'
import { useSelector } from 'react-redux'


let fileUrl=''

export const MovieNew = (movie) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500'
    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        const { active } = getState().movie
        const url = imgUrl + movie.poster_path
        const newMovie = {
            title: movie.title,
            overview: movie.overview,
            url: (movie.hasOwnProperty('poster_path'))?url:(active!==undefined)?imgUrl + active.poster_path:fileUrl       
        }
        const docRef = await db.collection(`${uid}/movies/data`).add(newMovie)
        dispatch(addNewMovie(docRef.id, newMovie))

    }
}

export const Edit = (movie, url) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500'
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active } = getState().movie

        const EditMovie = {
            title: movie.title,
            overview: movie.overview,
            url: (fileUrl !== '')?fileUrl:url   
        }

        const movieFire = { ...EditMovie  }
        delete movieFire.id

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

           await db.doc(`${uid}/movies/data/${movie.id}`).update(EditMovie)
           console.log(EditMovie)

        Swal.fire('Saved', movie.title, 'success');
        dispatch(ListarMovie(uid))
    }
}

export const Delete = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        const movie = getState().auth.movie;

        await db.doc(`${uid}/movies/data/${id}`).delete(movie);

        dispatch(deleteMovie(id));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Delete',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(ListarMovie(uid))
    }
}

export const deleteMovie = (id) => ({
    type: types.movieDelete,
    payload: id
});

export const startUploading = (file) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        fileUrl = await fileUpload(file)
        Swal.close()
       return fileUrl
    }
}

//FUNCIÓN SINCRÓNICA 

export const addNewMovie = ( id, movie ) => ({
    type: types.movieAddNew,
    payload: {
        id, ...movie
    }
})

export const ListarMovie = (uid) => {
    return async (dispatch) =>{
        const movies =  await loadMovies(uid)
        dispatch(setMovies(movies))
    }
}

export const setMovies = (movies) => {
    return {
        type: types.movieLoad,
        payload: movies
    }
}

export const activeMovie = (id,movie) => {
    return{
        type:types.movieActive,
        payload:{
            id,
            ...movie
        }
    }
}


export const clearMovie = () => {
    return {
        type: types.movieClear
    }
}
