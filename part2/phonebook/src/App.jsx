import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()));
  
  const addNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewSearch = (event) => {
    setFilterValue(event.target.value)
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
  
  const personsList = filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filterValue} onChange={addNewSearch} />
      </div>
      <h2>Add a new</h2>
        <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={addNewPerson} required/></div>
          <div>number: <input value={newNumber} onChange={addNewNumber} required/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>{personsList}</div>
    </div>
  )
}

export default App