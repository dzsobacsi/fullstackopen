import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoveBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    let likedBlog = { ...blog }
    likedBlog.likes++
    handleLike(likedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} from ${blog.author}?`)) {
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
        <div style={blogStyle}>
          {blog.title} &nbsp; {blog.author} &nbsp;
          <button onClick={toggleDetails}>view</button>
        </div>
        :
        <div style={blogStyle}>
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
