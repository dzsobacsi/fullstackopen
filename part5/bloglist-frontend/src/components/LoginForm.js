import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
  errorMessage,
  success
}) => (
  <div>
    <h2>Log in to application</h2>
    <Notification message={errorMessage} success={success}/>
    <form onSubmit={handleLogin}>
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

export default LoginForm
