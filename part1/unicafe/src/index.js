import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const StatItem = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props.stats
  if (all === 0) {
    return (<div>No feedback given</div>)
  }
  return(
    <div>
      <StatItem text='good' value={good} />
      <StatItem text='neutral' value={neutral} />
      <StatItem text='bad' value={bad} />
      <StatItem text='all' value={all} />
      <StatItem text='average' value={average} />
      <StatItem text='positive' value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood    = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad     = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  const stats = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': all,
    'average': average,
    'positive': positive
  }

  return (
    <div>
      <h1>unicafe</h1>
      <h2>give feedback</h2>
      <Button handleClick={addGood} text='good' />
      <Button handleClick={addNeutral} text='neutral' />
      <Button handleClick={addBad} text='bad' />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
