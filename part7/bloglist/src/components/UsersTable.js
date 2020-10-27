import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import UsersTableRow from './UsersTableRow'

const UsersTable = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(res => setUsers(res))
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) =>
          <UsersTableRow
            key={i}
            name={u.name}
            nrBlogs={u.blogs.length}
          />)
        }
      </tbody>
    </table>
  )
}

export default UsersTable
