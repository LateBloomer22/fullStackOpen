import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null);

  const getData = () => {
    personService.getAll()
      .then(initialList => {
        console.log('promise fullfilled')
        setPersons(initialList)      
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
      const nameObj = {name: newName, number: newNumber}
      personService.create(nameObj).then(returnedPerson => 
        {
        setPersons([...persons, returnedPerson])
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000);
        
        }
      )
    }   
  }

  const deletePerson = (id) => {
    const targetPerson = filteredPersons.filter(person => person.id === id)[0].name
    if (window.confirm(`Delete ${targetPerson}`)) {
      personService.deleteEntry(id).then(returnedPerson => {
        alert(`${targetPerson} was deleted`)
        setPersons(persons.filter(person => person.id !== returnedPerson.id))
        setFilterValue('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterValue={filterValue} addNewSearch={addNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} addNewPerson={addNewPerson}
      newNumber={newNumber} addNewNumber={addNewNumber}/>
      <h2>Numbers</h2>
      <Persons personsList={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App