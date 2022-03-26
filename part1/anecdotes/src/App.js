import { useState } from 'react'

const Button = ({handler, label}) => <button onClick={handler}>{label}</button>
const Anecdote = ({text, vote}) => (
    <>
      <div>{text}</div>
      <div>has {vote} votes</div>
    </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [winner, setWinner] = useState(0)

  const newAnecdote = () => setSelected ( Math.trunc(Math.random()*10000) % anecdotes.length)
  const vote = () => {
    const newvotes = [...votes]
    newvotes[selected] += 1 
    setVote(newvotes)
    setWinner(newvotes.indexOf(Math.max.apply(null, newvotes)))
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text= {anecdotes[selected]} vote={votes[selected]} />
      <Button handler={() => vote()} label='Vote' /> 
      <Button handler={() => newAnecdote()} label='Show new anecdote' /> 
      <h1>Anecdote with the most votes</h1>
      <Anecdote text= {anecdotes[winner]} vote={votes[winner]} />
    </div>
  )
}

export default App