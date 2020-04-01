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
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'CHANGE_USER',
        data: user
      })
      return user
    } catch (error) {
      return error
    }
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