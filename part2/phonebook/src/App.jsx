import { useState, useEffect } from 'react'
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
  const [success, setSuccess] = useState(true)

  const getData = () => {
    personService.getAll()
      .then(initialList => {
        setPersons(initialList)     
        console.log(initialList); 
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
      if (window.confirm(`${newName} is already added to phonebook, Do you want to replace the old number with the new one ?`))
        {
          const targetId = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
          const updatedPerson = {name: newName, number: newNumber}
          personService.update(targetId, updatedPerson).then(response => {
            console.log(response);
            console.log("Number updated");
            setNewName('')
            setNewNumber('')
            getData()
            setSuccess(true)
            }
          ).catch(error => {
            console.log(error);
            setSuccess(false);
            setMessage(`Information of ${updatedPerson.name} has been removed from the server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            getData()
          })
        }
    } else {
      const nameObj = {name: newName, number: newNumber}
      // axios.post(baseUrl, newPerson).then(response => response.data)
      personService.create(nameObj).then(returnedPerson => 
      {
        if (Object.hasOwn(returnedPerson, 'error'))
        {
            setNewName('')
            setNewNumber('')
            setSuccess(false);
            setMessage(returnedPerson.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
        } else {
            setPersons([...persons, returnedPerson])
            setNewName('')
            setNewNumber('')
            setSuccess(true);
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 10000);
          }
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
      <Notification message={message} success={success}/>
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