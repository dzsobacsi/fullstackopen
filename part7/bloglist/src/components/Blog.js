import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemoveBlog, user }) => {
  // if(!blog) {
  //   console.log('no blog')
  //   return null
  // }

  Blog.propTypes = {
    //blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemoveBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const addLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleLike(likedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemoveBlog(blog)
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
    </div>
  )
}

export default Blog
