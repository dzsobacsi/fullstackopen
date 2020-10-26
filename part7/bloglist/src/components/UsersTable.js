import React from 'react'
import User from './User'

const UsersTable = ({ blogs }) => {
  let nrOfBlogsPerUser = {}
  blogs
    .map(b => b.user.name)
    .forEach(n => {
      nrOfBlogsPerUser[n] = nrOfBlogsPerUser[n] ? nrOfBlogsPerUser[n] + 1 : 1
    })
  //console.log(nrOfBlogsPerUser)

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {Object
          .keys(nrOfBlogsPerUser)
          .map((n, i) => <User key={i} name={n} nrBlogs={nrOfBlogsPerUser[n]} />)
        }
      </tbody>
    </table>
  )
}

export default UsersTable
