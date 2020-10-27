import React from 'react'
import { Link } from 'react-router-dom'

const UsersTableRow = ({ name, nrBlogs, id }) => (
  <tr>
    <td><Link to={`/users/${id}`}>{name}</Link></td>
    <td>{nrBlogs}</td>
  </tr>
)

export default UsersTableRow
