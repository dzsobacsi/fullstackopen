import React from 'react'


const UsersTableRow = ({ name, nrBlogs }) => (
  <tr>
    <td>{name}</td>
    <td>{nrBlogs}</td>
  </tr>
)

export default UsersTableRow
