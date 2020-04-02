import loginService from '../services/login'
import userService from '../services/users'

// Reducer
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return action.data
    case 'LIKE_BLOG':
      return action.data
    case 'UNLIKE_BLOG':
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

export const likeBlog = (user, blog) => {
  return async (dispatch) => {
    const updatedUser = await userService.update(user.id, user.token, { likedBlogs: { ...user.likedBlogs, [blog.id]: true }})
    await blogsService.update(blog.id, user.token, { likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedUser,
    })
  }
}

export const unlikeBlog = (user, blog) => {
  return async (dispatch) => {
    const updatedUser = await userService.update(user.id, user.token, { likedBlogs: {...user.likedBlogs, [blog.id]: false }})
    await blogsService.update(blog.id, user.token, { likes: blog.likes - 1 })
    dispatch({
      type: 'UNLIKE_BLOG',
      data: updatedUser,
    })
  }
}

export default userReducer