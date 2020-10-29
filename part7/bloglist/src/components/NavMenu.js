import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = ({ loggedUser, handleLogout }) => {
  const padding = {
    padding: 5
  }

  const bar = {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightgray'
  }

  return (
    <div style={bar}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {loggedUser.name} logged in &nbsp;
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavMenu
