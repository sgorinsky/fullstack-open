import loginService from '../services/login'
import userService from '../services/users'
import blogService from '../services/blogs'

// Reducer
const userReducer = (state = { user: null, all: null }, action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return {
        all: action.data
      }
    case 'CHANGE_USER':
      return {
        user: action.data
      }
    case 'LIKE_BLOG':
      return {
        user: action.data
      }
    case 'UNLIKE_BLOG':
      return {
        user: action.data
      }
    default:
      return state
  }
}

// Dispatchers
export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'ALL_USERS',
      data: users
    })
  }
}

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

export const likeBlog = (user, blog) => {
  return async (dispatch) => {
    const updatedUser = await userService.update(user.id, user.token, { likedBlogs: { ...user.likedBlogs, [blog.id]: true }})
    await blogService.update(blog.id, user.token, { likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedUser,
    })
  }
}

export const unlikeBlog = (user, blog) => {
  return async (dispatch) => {
    const updatedUser = await userService.update(user.id, user.token, { likedBlogs: {...user.likedBlogs, [blog.id]: false }})
    await blogService.update(blog.id, user.token, { likes: blog.likes - 1 })
    dispatch({
      type: 'UNLIKE_BLOG',
      data: updatedUser,
    })
  }
}

export default userReducer