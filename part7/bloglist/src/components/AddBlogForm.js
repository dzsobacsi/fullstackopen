import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
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
      <Form onSubmit={addBlog}>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>title</Form.Label>
          <Col sm={4}>
            <Form.Control
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>author</Form.Label>
          <Col sm={4}>
            <Form.Control
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>url</Form.Label>
          <Col sm={4}>
            <Form.Control
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit">add</Button>
      </Form>
    </div>
  )
}

export default AddBlogForm
