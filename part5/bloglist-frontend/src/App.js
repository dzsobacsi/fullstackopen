import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // get all the blogs from the server once before the page loads
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login attempt: ', username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Successful login')
      setSuccess(true)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    } catch (exception) {
      console.log('exception: ', exception)
      setErrorMessage('Wrong credentials')
      setSuccess(false)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }

  const handleLogout = event => {
    window.localStorage.removeItem('loggedAppUser')
    console.log(`${user.username} logged out`)
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlogToAdd = { title, author, url }
    try {
      const newlyAddedBlog = await blogService.addNewBlog(newBlogToAdd)
      setBlogs(blogs.concat(newlyAddedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setSuccess(true)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    } catch (exception) {
      setErrorMessage(`Error: could not create new blog entry - Title and Url are mandatory`)
      setSuccess(false)
      setTimeout(() => { setErrorMessage(null) }, 5000)
      console.log(exception)
    }
  }

  // Conditional page layout based on logged in user
  return (
    <div>
      { user===null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          errorMessage={errorMessage}
          success={success}
        />
        :
        (
          <div>
            <h2>blogs</h2>
            <Notification message={errorMessage} success={success}/>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel='create new'>
              <AddBlogForm
                handleAddBlog={handleAddBlog}
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
              />
            </Togglable>
            <br/>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        )

      }
    </div>
  )
}

export default App
