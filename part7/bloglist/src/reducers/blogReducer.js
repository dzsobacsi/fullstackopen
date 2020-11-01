import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'NEW':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(b => b.id !== action.id)
  case 'LIKE':
    return state.map(b => b.id === action.data.id ? action.data : b)
  case 'COMMENT':
    return state.map(b => b.id === action.data.id ? action.data : b)
  default:
    return state
  }
}

export const addNew = (newBlog, toggleVisibility) => {
  return async dispatch => {
    try {
      const newlyAddedBlog = await blogService.addNewBlog(newBlog)
      dispatch({
        type: 'NEW',
        data: newlyAddedBlog
      })
      dispatch(setMessage(
        `a new blog ${newlyAddedBlog.title} by ${newlyAddedBlog.author} added`,
        true,
        3
      ))
      toggleVisibility()
    } catch (e) {
      console.error(e)
      dispatch(setMessage(
        'Error: could not create new blog entry - Title and Url are mandatory',
        false,
        5
      ))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.addLike(blog)
      dispatch({
        type: 'LIKE',
        data: likedBlog
      })
    } catch (e) {
      dispatch(setMessage('Error: could not add like', false, 5))
      console.error(e)
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.addComment(blog, comment)
      dispatch({
        type: 'COMMENT',
        data: commentedBlog
      })
      dispatch(setMessage('Comment added', true, 3))
    } catch (e) {
      dispatch(setMessage('Could not add comment', false, 5))
      console.error(e)
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.removeBlog(blog)
      dispatch({
        type: 'DELETE',
        id: blog.id
      })
      dispatch(setMessage(
        `the blog ${blog.title} by ${blog.author} is removed`,
        true,
        3
      ))
    } catch (e) {
      dispatch(setMessage('Error: could not remove the blog', false, 5))
      console.error(e)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default blogReducer
