import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const NavMenu = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Brand>blog app</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>users</Link>
          </Nav.Link>
          <Navbar.Text>
            {loggedUser.name} logged in &nbsp;
          </Navbar.Text>
          <Button variant="secondary" onClick={() => dispatch(logout())}>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavMenu
