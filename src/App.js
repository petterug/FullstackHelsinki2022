import React from "react";
import { useState } from "react";

// Statistics
const Statistics = ({good, neutral, bad}) => {
  let allVotes = good + neutral + bad
  let average = (good - bad) / allVotes
  let positive = `${(good / allVotes) * 100}%`

  if( allVotes === 0) {
    return (
      <>
      <h1>statistics</h1>
      <div>
        <p>No feedback given</p>
      </div>
      </>
    )
  }
  return (
    <>
    <h1>statistics</h1>
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={allVotes} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={positive} /></tr>
        </tbody>
      </table>
    </div>
    </>
  )

}
const StatisticLine = (props) => {

  return(
    <>
    <td>
      {props.text} 
    </td>
    <td>
      {props.value}
    </td>
    </>
  )
}

// Feedback
const Feedback = (props) => {

  return (
    <>
    <h1>give feedback</h1>
    <div>
      <Button onClick={ props.increaseGood } text={'Good'} ></Button>
      <Button onClick={ props.increaseNeutral } text={'Neutral'} ></Button>
      <Button onClick={ props.increaseBad } text={'Bad'} ></Button>
    </div>
    </>
  )
}

//Button
const  Button = ({onClick, text }) => {
  return (
    <>
    <button onClick={onClick}>{text}</button>
    </>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <>
      <Feedback increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
