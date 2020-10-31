import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, message, success }) => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    message: PropTypes.string,
    success: PropTypes.bool.isRequired
  }

  const login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <br/>
      <h2>Login</h2>
      <Notification message={message} success={success}/>
      <Form onSubmit={login}>
        <Form.Row>
          <Col xs={5}>
            <Form.Label>username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br/>
            <Form.Label>password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>
        </Form.Row><br/>
        <Button id="loginbutton" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm
