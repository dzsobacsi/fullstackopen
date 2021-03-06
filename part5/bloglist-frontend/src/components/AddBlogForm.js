import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  AddBlogForm.propTypes = {
    handleAddBlog: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({ title, author, url })
    if (title && url) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br/>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br/>
          url
          <input
            id="url"
            type="text"
            value={url}
            name="Author"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddBlogForm
