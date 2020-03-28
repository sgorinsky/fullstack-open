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

export default blogReducer