import React from 'react'

// New components under refactoring
const Header = ({name}) => {
  return (
    <div>
      <h2>{name}</h2>
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
  
    const courseList = course.map((part) => 
        <div key={part.id}>
            <Header name={part.name} />
            <Content parts={part.parts}/>
            <strong><Total parts={part.parts}/></strong>
        </div>
    )
  
  return (
    <>
        {courseList}
    </>
  )
}

export default Course
