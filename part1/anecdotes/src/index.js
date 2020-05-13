import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Anecdote = ({ anecdote, score }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {score} votes</p>
  </div>
)

const App = (props) => {
  const ary = new Array(anecdotes.length)
  ary.fill(0)

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(ary)

  const newAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    const copy = [...scores]
    copy[selected]++
    setScores(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} score={scores[selected]}/>
      <Button handleClick={vote} text='vote' />
      <Button handleClick={newAnecdote} text='new anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={props.anecdotes[scores.indexOf(Math.max(...scores))]}
        score={Math.max(...scores)} />
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
