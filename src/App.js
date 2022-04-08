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
      <Parts part={props.course.parts[0]}/>
      <Parts part={props.course.parts[1]}/>
      <Parts part={props.course.parts[2]}/>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content course={props.course} />
    </div>
  )
}

const Footer = (props) => {
  return (
    <p>Number of exercises is {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
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
    }
    ]
  }

  return <Course course={course} />
} 

export default App