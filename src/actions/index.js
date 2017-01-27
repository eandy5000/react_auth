import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER
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

