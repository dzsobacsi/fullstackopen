import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm/>', () => {
  test('5.16 the form calls the event handler with the right details', () => {
    const handleAddBlog = jest.fn()

    const component = render(
      <AddBlogForm handleAddBlog={handleAddBlog} />
    )

    const form        = component.container.querySelector('form')
    const titleInput  = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput    = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'a newly added blog' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Ford Perfect' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'https://fordperfect.com' }
    })
    fireEvent.submit(form)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    console.log(handleAddBlog.mock.calls[0])
    expect(handleAddBlog.mock.calls[0][0].title).toBe('a newly added blog')
    expect(handleAddBlog.mock.calls[0][0].author).toBe('Ford Perfect')
    expect(handleAddBlog.mock.calls[0][0].url).toBe('https://fordperfect.com')
  })
})
