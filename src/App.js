import React, {useState} from 'react'


const Header = ({name}) => {
  return (
    <h1>{name}</h1>
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
      {props.course.parts.map(part => 
        <Parts key={part.name} part={part} />
      )}
    </div>
  )
}

const Footer = (props) => {
  
  let initValue = 0
  const sum = props.courses.parts.reduce(( s, p ) => {return s + p.exercises }, initValue)
  
  return (
    <h4>Number of exercises is {sum}</h4>
  )}


const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content course={props.course} />
      <Footer courses={props.course} />
    </div>
  )
}


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
    },
    {
      name: "Redux",
      exercises: 11
    }
    ]
  }

  return <Course course={course} />
} 

export default App