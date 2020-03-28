import blogService from '../services/blogs'

// Action Handler
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return [...action.data]
    case 'CREATE_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

// Dispatchers
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (newBlog, token) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog, token)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export default blogReducer
