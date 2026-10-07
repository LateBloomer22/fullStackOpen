import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 1,
      number: "040-1234567",
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObj = {name: newName, id: persons.length + 1, number: newNumber}
      setPersons([...persons, nameObj])
      setNewName('')
      setNewNumber('')
    }   
  }
  
  const personsList = persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={addNewPerson} required/></div>
        <div>number: <input value={newNumber} onChange={addNewNumber} required/></div>
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