import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if(!blog) {
    console.log('no blog')
    return null
  }

  Blog.propTypes = {
    //blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  const addLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(likedBlog))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  return(
    <div className="blog-detailed">
      <h2>{blog.title} &nbsp; - &nbsp; {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes &nbsp;
      <Button onClick={addLike}>like</Button><br/>
      added by {blog.user.name}<br/>
      {user.username === blog.user.username &&
        <Button variant="danger" onClick={remove}>
          remove
        </Button>
      }
      <h2>comments</h2>
      <br/>
      {blog.comments.length
        ? <ul>{blog.comments.map((c, i) => <li key={i}>{c.content}</li>)}</ul>
        : <span>there are no comments</span>
      }
      <CommentForm blog={blog} />
    </div>
  )
}

export default Blog
