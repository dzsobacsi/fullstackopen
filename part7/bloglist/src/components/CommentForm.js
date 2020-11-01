import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = e => {
    e.preventDefault()
    const comment = { content: e.target.comment.value }
    dispatch(commentBlog(blog, comment))
    document.getElementById('comment-form').reset()
  }

  return (
    <form id="comment-form" onSubmit={addComment}>
      <input type="text" name="comment" />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
