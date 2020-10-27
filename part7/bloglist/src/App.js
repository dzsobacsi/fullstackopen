import React, { useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersTable from './components/UsersTable'

import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/messageReducer'
import { initializeBlogs, addNew, deleteBlog, likeBlog } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { message, success } = useSelector(state => state.message)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const compare = (a, b) => b.likes - a.likes

  // get all the blogs from the server once before the page loads
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // check if logged user info is saved to localStorage once before the page
  // loads.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      dispatch(login({ username, password }))
      dispatch(setMessage('Successful login', true, 3))
    } catch (exception) {
      console.log('exception: ', exception)
      dispatch(setMessage('Wrong credentials', false, 3))
    }
  }

  const handleLogout = () => dispatch(logout())

  const handleAddBlog = async (newBlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addNew(newBlogToAdd))
      dispatch(setMessage(
        `a new blog ${newBlogToAdd.title} by ${newBlogToAdd.author} added`,
        true,
        3
      ))
    } catch (exception) {
      dispatch(setMessage(
        'Error: could not create new blog entry - Title and Url are mandatory',
        false,
        5
      ))
      console.error(exception)
    }
  }

  const handleRemoveBlog = async (blogToRemove) => {
    try {
      dispatch(deleteBlog(blogToRemove))
      dispatch(setMessage(
        `the blog ${blogToRemove.title} by ${blogToRemove.author} is removed`,
        true,
        3
      ))
    } catch (exception) {
      dispatch(setMessage('Error: could not remove the blog', false, 5))
      console.error(exception)
    }
  }

  const handleLike = async (blogToUpdate) => {
    try {
      dispatch(likeBlog(blogToUpdate))
    } catch (exception) {
      dispatch(setMessage('Error: could not add like', false, 5))
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
            {user.name} logged in &nbsp;
            <button onClick={handleLogout}>logout</button>
          </p>
          <Switch>
            <Route path='/users/:id'>
              individual user view
              {/*<User blogs={blogs} />*/}
            </Route>
            <Route path='/users'>
              <h2>Users</h2>
              <UsersTable />
            </Route>
            <Route path='/'>
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
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App
