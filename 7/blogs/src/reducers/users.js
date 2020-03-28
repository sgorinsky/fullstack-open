import loginService from '../services/login'

// Reducer
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return action.data
    default:
      return state
  }
}

// Dispatchers
export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'CHANGE_USER',
      data: user
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CHANGE_USER',
      data: null
    })
  }
}

export default userReducer