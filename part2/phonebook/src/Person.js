import React from 'react'

const Person = ({ person, handleDelete }) => {
  const style = {
    padding: "0px 10px 0px 10px"
  }

  return(
      <tr>
        <td style={style}>{person.name}</td>
        <td style={style}>{person.number}</td>
        <td style={style}>
          <button onClick={() => handleDelete(person)}>
            <i class="fa fa-trash"></i>
          </button><br/>
        </td>
      </tr>
  )
}

export default Person
