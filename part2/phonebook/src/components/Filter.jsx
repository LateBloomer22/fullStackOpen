import React from 'react'

const Filter = ({filterValue, addNewSearch}) => {
  return (
    <div>
      filter shown with: <input value={filterValue} onChange={addNewSearch} />
    </div>
  )
}

export default Filter
