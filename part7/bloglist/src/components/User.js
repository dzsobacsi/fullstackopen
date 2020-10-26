import React from 'react'


const User = ({ name, nrBlogs }) => (
  <tr>
    <td>{name}</td>
    <td>{nrBlogs}</td>
  </tr>
)

export default User
