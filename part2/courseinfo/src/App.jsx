// New components under refactoring
const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({part}) => {  
  return (
  <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  const courseList = parts.map(part => 
    <Part key={part.id} part={part} />
  )
  console.log(courseList)
  return (
    <div>
      {courseList}
    </div>
    
  )
}

const Total = ({parts}) => {
  
  const totalExercises = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises
  }, 0)

  return (
    <p>Total number of exercises: {totalExercises}</p>
  )
}

const Course = ({course}) => {
    console.log(course);  
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <strong><Total parts={course.parts}/></strong>
      </>
    )
}

const App =() => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App
