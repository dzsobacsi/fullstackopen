import React from 'react'
import { Form, Button } from 'react-bootstrap'
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
    <Form id="comment-form" onSubmit={addComment}>
      <Form.Control type="text" name="comment" />
      <Button type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm
