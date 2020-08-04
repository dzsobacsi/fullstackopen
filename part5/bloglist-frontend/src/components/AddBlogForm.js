import React from 'react'

const AddBlogForm = ({ handleAddBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleAddBlog}>
      <div>
        title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        <br/>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br/>
          url
            <input
              type="text"
              value={url}
              name="Author"
              onChange={({ target }) => setUrl(target.value)}
            />
      </div>
      <button type="submit">add</button>
    </form>
    <br/>
  </div>
)

export default AddBlogForm
