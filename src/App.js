import React, {useState} from 'react'


const Hello = (props) => {
  const hello = "Hello from other component";
  return (
    <div>
      <p>{hello} to {props.name} born in {props.dob}</p>
    </div>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course['name']}</h1>
  )
}
const Parts = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Parts part={props.course.parts[0]}/>
      <Parts part={props.course.parts[1]}/>
      <Parts part={props.course.parts[2]}/>
    </div>
  )
}
const Footer = (props) => {
  return (
    <p>Number of exercises is {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({onClick, text}) => (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )

const Button2= ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => { 
  const course = {
    name: "Half stack application development",
    parts: [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
    ]
  }

  const leftInit = 97
  const rightInit = 65

  const [counter, setCounter ] = useState(0)
  const [left, setLeft] = useState(leftInit)
  const [right, setRight] = useState(rightInit)
  const [allClicks, setAll] = useState([])
  const [value, setValue] = useState(10)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const resetButton = () => {
    setLeft(leftInit)
    setRight(rightInit)
    setAll(allClicks.concat('S'))
  }
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

  const setToValue = (newValue) => setValue(newValue)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />

      <div>
        <Display counter={counter} />
      </div>
      <Button onClick={ increaseByOne } text={'plus'} />
      <Button onClick={ setToZero } text={'zero'} />
      <Button onClick={ decreaseByOne } text={'minus'} />

      <div>
        {String.fromCharCode(left)}
        <Button2 handleClick={handleLeftClick} text ='left' />

        <Button2 handleClick={handleRightClick} text ='right' />
        {String.fromCharCode(right)}
      </div>
      <div>
        <button onClick={resetButton}>resetButton</button>
      </div>
      <History allClicks={allClicks} />

      <div>
        <p>button component</p>
        {value}
        <Button2 handleClick={() => setToValue(1000)} text='Thousand' />
        <Button2 handleClick={() => setToValue(0)} text='Reset' />
        <Button2 handleClick={() => setToValue(value + 1)} text='Increment' />

        <p>not button component</p>
        {value}
        <button onClick={() => setToValue(1000)}>Thousand</button>
        <button onClick={() => setToValue(0)}>Reset</button>
        <button onClick={() => setToValue(value + 1)}>Increment</button>
      </div>

    </div>
  )} 

export default App