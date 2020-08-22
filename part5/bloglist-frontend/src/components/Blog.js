import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    //pass
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <button onClick={addLike}>like</button>

        </div>
      }
    </div>
  )
}

export default Blog
