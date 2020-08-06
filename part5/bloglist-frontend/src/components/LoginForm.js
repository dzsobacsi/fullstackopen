import React, { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ handleLogin, errorMessage, success }) => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} success={success}/>
      <form onSubmit={login}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          <br/>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
