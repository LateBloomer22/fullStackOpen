import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const getData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }

  useEffect(getData, [])

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