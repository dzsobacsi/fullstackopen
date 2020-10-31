import blogService from '../services/blogs'

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

export const addNew = newBlog => {
  return async dispatch => {
    const newlyAddedBlog = await blogService.addNewBlog(newBlog)
    dispatch({
      type: 'NEW',
      data: newlyAddedBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.addLike(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(blog, comment)
    dispatch({
      type: 'COMMENT',
      data: commentedBlog
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.removeBlog(blog)
    dispatch({
      type: 'DELETE',
      id: blog.id
    })
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
