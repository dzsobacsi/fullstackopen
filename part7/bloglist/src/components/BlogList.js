import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  const compare = (a, b) => b.likes - a.likes

  return (
    <Table striped>
      <tbody>
        {blogs
          .sort(compare)
          .map((b, i) => (
            <tr key={i}>
              <td>
                <Link to={`/blogs/${b.id}`}>
                  {b.title}&nbsp;-&nbsp;{b.author}
                </Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default BlogList
