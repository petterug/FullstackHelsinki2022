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


const Course = ({ course }) => {
  return (
    <div>
      
        <Header name={course.name} />
        <Content course={course} />
        <Footer courses={course} />  
      
    </div>
  )
}


const App = () => { 
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
} 

export default App