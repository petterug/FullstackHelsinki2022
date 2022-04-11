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

export default Course