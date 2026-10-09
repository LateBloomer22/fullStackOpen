import React from 'react'

const Persons = ({personsList, deletePerson}) => {
  
  const displayList = personsList.map(person => {
  return (
  <p key={person.id}>
    {person.name} {person.number} 
  <button onClick={() => deletePerson(person.id)}>delete</button> 
  </p> 
  
)})

  return (
    <div>
      {displayList}
    </div>
  )
}

export default Persons
