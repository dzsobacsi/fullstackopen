import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'RESET_USER':
    return null
  default:
    return state
  }
}

export const setUser = user => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    user
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedAppUser', JSON.stringify(user)
    )
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedAppUser')
  return { type: 'RESET_USER' }
}

export default userReducer
