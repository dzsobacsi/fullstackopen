import React from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNew(content))
    dispatch(setMessage(`Anecdote added "${content}"`))
    setTimeout(() => dispatch(resetMessage()), 5000)
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

export default AnecdoteForm
