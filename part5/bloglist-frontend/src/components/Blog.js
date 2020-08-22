import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    //pass
  }

  return(
    <div>
      { showDetails === false ?
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>view</button>
        </div>
        :
        <div>
          {blog.title}
          {blog.author}
          {blog.url}
          {blog.likes}
          <button onClick={addLike}>like</button>
          <button onClick={toggleDetails}>hide</button>
        </div>
      }
    </div>
  )
}

export default Blog
