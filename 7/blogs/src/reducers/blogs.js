import blogService from '../services/blogs'

// Action Handler
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return [...action.data]
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id === action.data.id)
    default:
      return state
  }
}

// Dispatchers
export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
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

export const updateBlog = (id, newObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, newObject)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id, token)
    console.log(deletedBlog)
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog
    })
  }
}

export default blogReducer
