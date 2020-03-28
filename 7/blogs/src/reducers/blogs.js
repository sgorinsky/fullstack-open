import blogService from '../services/blogs'

// Action Handler
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return {
        ...state,
        blogs: action.data
      }
    default:
      return {
        ...state
      }
  }
}

// Dispatchers
export const initializeBlogs = (state, action) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer
