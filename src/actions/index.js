import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         FETCH_MESSAGE
         } from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
    return function(dispatch) {
    
    //send credentials to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
    //if credentials are good 
    //-update state to indicate user is authenticated
    dispatch({type: AUTH_USER})
    //-save Jwt token
    localStorage.setItem('token', response.data.token)
    //-redirect to feature
    browserHistory.push('/feature')
        })
        .catch(() => {
        //if request is bad
        //-show an error
        dispatch(authError('bad login credentials'))
        })

    }
}

export function signupUser({ email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
             .then(response => {
                 dispatch({ type: AUTH_USER})
                 console.log(response.data)
                 localStorage.setItem('token', response.data.token)

                 browserHistory.push('/feature')
             })
             .catch( response => {
                 dispatch(authError(response.data.error))
             })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    
    localStorage.removeItem('token')

    return {
        type: UNAUTH_USER
    }
}

export function fetchMessage() {

    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
             .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
             })
    }
}

