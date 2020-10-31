import React from 'react'

const CommentForm = ({ blog, handleCommentBlog }) => {
  const addComment = e => {
    e.preventDefault()
    const comment = { content: e.target.comment.value }
    handleCommentBlog(blog, comment)
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
