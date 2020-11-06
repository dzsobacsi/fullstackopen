
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors }) => {
  const [birthYear, setBirthYear] = useState('')
  const [name, setName] = useState(authors[0].name)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = e => {
    e.preventDefault()
    editAuthor({variables: {name, setBornTo: birthYear}})
    setBirthYear('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map((a, i) => <option key={i} value={a.name}>{a.name}</option>)}
        </select><br/>
        born
        <input onChange={({ target }) => setBirthYear(target.value)} /><br/>
        <button type="submit">udate author</button>
      </form>
    </div>
  )
}

export default EditAuthor
