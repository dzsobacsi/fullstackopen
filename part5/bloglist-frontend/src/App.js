import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const blogFormRef = useRef()
  const compare = (a, b) => b.likes - a.likes

  // get all the blogs from the server once before the page loads
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  // check if logged user info is saved to localStorage once before the page
  // loads.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    console.log('login attempt: ', username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      setUser(user)
      setMessage('Successful login')
      setSuccess(true)
      setTimeout(() => { setMessage(null) }, 3000)
    } catch (exception) {
      console.log('exception: ', exception)
      setMessage('Wrong credentials')
      setSuccess(false)
      setTimeout(() => { setMessage(null) }, 3000)
    }
  }

  const handleLogout = event => {
    window.localStorage.removeItem('loggedAppUser')
    console.log(`${user.username} logged out`)
    setUser(null)
  }

  const handleAddBlog = async (newBlogToAdd) => {
    try {
      const newlyAddedBlog = await blogService.addNewBlog(newBlogToAdd)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newlyAddedBlog))
      setMessage(`a new blog ${newBlogToAdd.title} by ${newBlogToAdd.author} added`)
      setSuccess(true)
      setTimeout(() => { setMessage(null) }, 3000)
    } catch (exception) {
      setMessage(`Error: could not create new blog entry - Title and Url are mandatory`)
      setSuccess(false)
      setTimeout(() => { setMessage(null) }, 5000)
      console.error(exception)
    }
  }

  const handleRemoveBlog = async (blogToRemove) => {
    try {
      await blogService.removeBlog(blogToRemove)
      setBlogs(blogs.filter(b => b.id !== blogToRemove.id))
      setMessage(`the blog ${blogToRemove.title} by ${blogToRemove.author} is removed`)
      setSuccess(true)
      setTimeout(() => { setMessage(null) }, 3000)
    } catch (exception) {
      setMessage(`Error: could not remove the blog`)
      setSuccess(false)
      setTimeout(() => { setMessage(null) }, 5000)
      console.error(exception)
    }
  }

  const handleLike = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.addLike(blogToUpdate)
      setBlogs(
        blogs
          .filter(b => b.id !== blogToUpdate.id)
          .concat(updatedBlog)
      )
    } catch (exception) {
      setMessage(`Error: could not add like`)
      setSuccess(false)
      setTimeout(() => { setMessage(null) }, 5000)
      console.error(exception)
    }
  }

  // Conditional page layout based on logged in user
  return (
    <div>
      { user===null ?
        <LoginForm
          handleLogin={handleLogin}
          message={message}
          success={success}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification message={message} success={success}/>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='create new' ref={blogFormRef}>
            <AddBlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          <br/>
          {blogs.sort(compare).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemoveBlog={handleRemoveBlog}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
