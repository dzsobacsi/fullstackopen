import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Best blog ever',
    author: 'Arthur Dent',
    url: 'http://bbe.blog.com',
    likes: 42,
    user: {
      username: 'arthur',
      name: 'Arthur Dent',
      id: '5f0fcea60f633f1a8a5a14a0'
    }
  }

  const user = {
    username: 'arthur'
  }

  const handleLike = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} handleLike={handleLike}/>
    )
  })

  test('5.13 renders title and author but not url and likes', () => {
    expect(component.container).toHaveTextContent(
      'Best blog ever'
    )
    expect(component.container).toHaveTextContent(
      'Arthur Dent'
    )
    expect(component.container).not.toHaveTextContent(
      'http://bbe.blog.com'
    )
    expect(component.container).not.toHaveTextContent(
      '42'
    )
  })

  test('5.14 url and likes are shown after click on view button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'http://bbe.blog.com'
    )
    expect(component.container).toHaveTextContent(
      '42'
    )
  })

  test('5.15 if like button clicked twice then event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
