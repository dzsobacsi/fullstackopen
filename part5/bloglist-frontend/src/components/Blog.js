import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemoveBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemoveBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    let likedBlog = { ...blog }
    likedBlog.likes++
    handleLike(likedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemoveBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: '#4287f5',
    color: 'white'
  }

  return(
    <div>
      { showDetails === false ?
        <div className="blog-short" style={blogStyle}>
          {blog.title} &nbsp; {blog.author} &nbsp;
          <button onClick={toggleDetails}>view</button>
        </div>
        :
        <div className="blog-detailed" style={blogStyle}>
          {blog.title} &nbsp;
          <button onClick={toggleDetails}>hide</button><br/>
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes} &nbsp;
          <button onClick={addLike}>like</button><br/>
          {user.username === blog.user.username &&
            <button style={removeButtonStyle} onClick={remove}>
              remove
            </button>
          }
        </div>
      }
    </div>
  )
}

export default Blog
