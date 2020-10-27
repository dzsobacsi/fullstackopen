import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return(
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length
        ? (
          <div>
            <b>added blogs</b>
            <ul>
              {user.blogs.map((b, i) => <li key={i}>{b.title}</li>)}
            </ul>
          </div>
        )
        : <b>no blogs added by this user</b>
      }

    </div>
  )
}

export default User
