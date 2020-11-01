import React from 'react'
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

  const removeButtonStyle = {
    backgroundColor: '#4287f5',
    color: 'white'
  }

  return(
    <div className="blog-detailed">
      <h2>{blog.title} &nbsp; - &nbsp; {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes &nbsp;
      <button onClick={addLike}>like</button><br/>
      added by {blog.user.name}<br/>
      {user.username === blog.user.username &&
        <button style={removeButtonStyle} onClick={remove}>
          remove
        </button>
      }
      <h2>comments</h2>
      <CommentForm blog={blog} />
      {blog.comments.length
        ? <ul>{blog.comments.map((c, i) => <li key={i}>{c.content}</li>)}</ul>
        : <span>there are no comments</span>
      }
    </div>
  )
}

export default Blog
