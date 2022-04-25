import axios from 'axios'

import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const UPDATE = 'UPDATE'
/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const _updateAuth = auth => ({type: UPDATE, auth})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    console.log('me',res.data)
    return dispatch(setAuth(res.data))
  }
}

export function authenticate (username, password, method, email) { 
  return async dispatch => {
    try {
      let res;
      if (arguments.length === 3) {
        res = await axios.post(`/auth/${method}`, {username, password})
      } else {
        res = await axios.post(`/auth/${method}`, {username, password, email})
      }
      window.localStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
    } catch (authError) {
      return dispatch(setAuth({error: authError}))
    }
  }
}

export const updateAuth = (username, email, password, history) => async dispatch => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const res = await axios.put(`/auth/edit`, {username, email, password},
      {headers:{
        authorization: token 
      }}
    )
    dispatch(_updateAuth(res.data))
    history.push("/account");
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}
export const comparePass = (oldPassword) => async dispatch => {
  try{
    const token = window.localStorage.getItem(TOKEN)
    const res = await axios.post('/auth/comparepassword',{oldPassword},
    {
      headers:{
        authorization:token
      }
    })
    console.log('compare pass',res.data.isTrue)
    return res.data.isTrue
  }catch(err){
    return dispatch(setAuth({error: authError}))
  }
}

export const updatePass = (password,history) => async dispatch => {
  try{
    const token = window.localStorage.getItem(TOKEN)
    const res = await axios.put('/auth/changepassword',{password},
    {
      headers:{
        authorization:token
      }
    })
    console.log("changed!",res.data)
    history.push('/account')
  }catch(err){
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case UPDATE:
      return action.auth
    default:
      return state
  }
}
