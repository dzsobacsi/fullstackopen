import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNew(content)
    props.setMessage(`Anecdote added "${content}"`, 4)
  }

  return(
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { addNew, setMessage }
)(AnecdoteForm)
