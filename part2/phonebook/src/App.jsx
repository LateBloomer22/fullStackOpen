import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

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
      <Filter filterValue={filterValue} addNewSearch={addNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} addNewPerson={addNewPerson}
      newNumber={newNumber} addNewNumber={addNewNumber}/>
      <h2>Numbers</h2>
      <Persons personsList={personsList}/>
    </div>
  )
}

export default App