import { useState, useEffect } from 'react'

const Button = ({onClick, text}) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
)

const Votes = ({points, selected}) => {
  return (
    <>
      <div>Has {points[selected]} votes</div>
    </>
  )
}

const DailyAnecdote = ({anecdote}) => {
  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>{anecdote}</div>
    </>
  )
}

const MostVotes = ({points, selected, anecdotes}) => {


  const max = Math.max(...points)
  const index = points.indexOf(max)

  if(max === 0) {
    return (
    <>
    </>
    )
  }
  return (
    <>
    <h1>Anecdote with most votes</h1>
    <div>{anecdotes[index]}</div>
    </>
  )
}



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
  const max = anecdotes.length
  const [points, setScore] = useState(Array(max).fill(0))
  const [selected, setSelected] = useState(Math.floor(Math.random()*max))
 
  const nextAnecdote = () => {
    
    setSelected(Math.floor(Math.random()*max))
  }

  const increaseVote = () => {
    let copy = [...points]
    copy[selected] += 1
    setScore(copy)
  }

  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} />
      <Votes points={points} selected={selected}/>
      <Button onClick={increaseVote} text={'vote'} />
      <Button onClick={nextAnecdote} text={'Next anecdote'} />
      <MostVotes points={points} selected={selected} anecdotes={anecdotes} />
      
    </div>
  )
}

export default App