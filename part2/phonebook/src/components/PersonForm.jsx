import React from 'react'

const PersonForm = ({addPerson, newName, addNewPerson, newNumber, addNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={addNewPerson} required/></div>
          <div>number: <input value={newNumber} onChange={addNewNumber} required/></div>
          <div>
            <button type="submit">add</button>
          </div>
    </form>
  )
}

export default PersonForm
