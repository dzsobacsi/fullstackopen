import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const compare = (a, b) => b.likes - a.likes

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return blogs
    .sort(compare)
    .map((b, i) => (
      <div key={i} className="blog-short" style={blogStyle}>
        <Link to={`/blogs/${b.id}`}>
          {b.title}&nbsp;-&nbsp;{b.author}
        </Link>
      </div>
    ))
}

export default BlogList
