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
import { initializeBlogs, addNew } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { message, success } = useSelector(state => state.message)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)
  const blogFormRef = useRef()
  //console.log(blogFormRef)

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

  // Conditional page layout based on logged in user
  return (
    <div className="container">
      { loggedUser===null
        ? <LoginForm message={message} success={success} />
        :
        <div>
          <NavMenu loggedUser={loggedUser} />
          <Notification message={message} success={success} />
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
              <Blog blog={clickedBlog} user={loggedUser} />
            </Route>
            <Route path='/'>
              <Togglable buttonLabel='create new' ref={blogFormRef}>
                <AddBlogForm
                  handleAddBlog={
                    blog => dispatch(
                      addNew(blog, blogFormRef.current.toggleVisibility)
                    )
                  }
                />
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
