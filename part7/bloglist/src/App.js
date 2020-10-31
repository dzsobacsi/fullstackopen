import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import NavMenu from './components/NavMenu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersTable from './components/UsersTable'
import User from './components/User'
import userService from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/messageReducer'
import { initializeBlogs, addNew, deleteBlog, likeBlog, commentBlog } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { message, success } = useSelector(state => state.message)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)

  const blogFormRef = useRef()

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

  // get all users from the database
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(res => setUsers(res))
  }, [])

  const matchUser = useRouteMatch('/users/:id')
  const clickedUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const clickedBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

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

  const handleCommentBlog = async (blog, comment) => {
    try {
      dispatch(commentBlog(blog, comment))
    } catch (e) {
      dispatch(setMessage('Could not add comment', false, 5))
      console.error(e)
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
    <div className="container">
      { loggedUser===null ?
        <LoginForm
          handleLogin={handleLogin}
          message={message}
          success={success}
        />
        :
        <div>
          <Notification message={message} success={success}/>
          <NavMenu loggedUser={loggedUser} handleLogout={handleLogout} />
          <h1>blog app</h1>
          <Switch>
            <Route path='/users/:id'>
              <User user={clickedUser} />
            </Route>
            <Route path='/users'>
              <h2>Users</h2>
              <UsersTable users={users} />
            </Route>
            <Route path='/blogs/:id'>
              <Blog
                blog={clickedBlog}
                handleLike={handleLike}
                handleRemoveBlog={handleRemoveBlog}
                handleCommentBlog={handleCommentBlog}
                user={loggedUser}
              />
            </Route>
            <Route path='/'>
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <AddBlogForm handleAddBlog={handleAddBlog} />
              </Togglable>
              <br/>
              <BlogList blogs={blogs} />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App
