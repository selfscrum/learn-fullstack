import { useState } from 'react'


// Create the button with handler
const Button = ({handler, label}) => <button onClick={handler()}>{label}</button>

// Line in the Statistics Block
const StatisticsLine = ({value, text}) => <div>{text} {value}</div>

// Create the statistics block
const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0 )
    return ( 
    <div>No feedback given</div> 
    )
  else return (
    <>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={good+neutral+bad}  />
      <StatisticsLine text='average' value={(good-bad)/(good+neutral+bad)} />
      <StatisticsLine text='positive' value={`${good / (good + neutral + bad) * 100} %`} />
    </>
    )
}

// The main App
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler    = () => setGood(good + 1)
  const neutralHandler = () => setNeutral(neutral + 1)
  const badHandler     = () => setBad(bad + 1)
   
  return (
    <div>
      <h1>give feedback</h1>
      <Button handler = {() => goodHandler} label = 'good' />
      <Button handler = {() => neutralHandler} label = 'neutral' />
      <Button handler = {() => badHandler} label = 'bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App