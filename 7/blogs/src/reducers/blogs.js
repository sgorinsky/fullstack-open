import blogService from '../services/blogs'
require('dotenv').config()

// Action Handler
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return [...action.data]
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      return state.map(blog => action.data.id !== blog.id ? blog : action.data)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
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
    return blog
  }
}

export const updateBlog = (id, token, newObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, token, newObject)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
    return updatedBlog
  }
}

export const makeComment = (id, newObject) => {
  return async (dispatch) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJuYW1lIjoicm9vdCIsInBhc3N3b3JkIjoiJDJiJDEwJFpoU0hpcGc2b2NrMWVhdU90a0dzQU9JTDFUT1BTRXdQbnNUVVBHemhRdk1aM2YvTm9ZeHNXIiwiaWF0IjoxNTg1ODAzMDQ3fQ.CDXklyQretSeaCRz7NgqvTRoL2yCC3W_sGWELo6zdDw"
    const commentedBlog = await blogService.update(id, token, newObject)
    console.log(commentedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: commentedBlog
    })
    return commentedBlog
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog,
      id,
    })
  }
}

export default blogReducer
