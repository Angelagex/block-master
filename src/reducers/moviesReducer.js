import {types} from '../types/types'

const initialState ={
    movie:[],
    active: {
        title: '',
        overview: ''
    }
}
export const moviesReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.movieAddNew:
            return{
                ...state,
                movie:[action.payload, ...state.movie]
            }
        case types.movieLoad:
            return{
                ...state,
                movie: [...action.payload]
            }
        case types.movieActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.movieClear:
            return {
                ...state,
                active: null
            }
        default:
           return state;
    }
}