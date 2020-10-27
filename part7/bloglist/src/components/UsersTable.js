import React from 'react'
import UsersTableRow from './UsersTableRow'

const UsersTable = ({ users }) => {
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
            id={u.id}
            nrBlogs={u.blogs.length}
          />)
        }
      </tbody>
    </table>
  )
}

export default UsersTable
