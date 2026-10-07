import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 1,
     }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObj = {name: newName, id: persons.length + 1}
      setPersons([...persons, nameObj])
      setNewName('')
    }   
  }
  
  const personsList = persons.map(person => <p key={person.id}>{person.name}</p>)


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={addNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      ...
      <div>
        {personsList}
      </div>
    </div>
  )
}

export default App