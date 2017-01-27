import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types'

export default function(state = {}, action) {
    switch(action.type){
        case AUTH_USER: {
            let out = {...state, authenticated: true}
            return out
        }
        case UNAUTH_USER: 
        return {...state, authenticated: false}
        case AUTH_ERROR:
        return { ...state, error: action.payload }
    }
    return state
}