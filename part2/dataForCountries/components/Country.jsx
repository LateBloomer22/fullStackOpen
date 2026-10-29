import React from 'react'

const Country = ({country}) => {
  return (
    <div>
        <h2>Country Name</h2>
      <p>Capital city</p>
      <p>Area size</p>
      <h2>Languages</h2>
      <ul>
        <li>Language 1</li>
        <li>Language 2</li>
      </ul>
      <p>Flag image</p>
      {/* <h2>Weather in Country</h2>
      <p>Temperature</p>
      <p>Weather icon</p>
      <p>Wind speed</p> */}
    </div>
  )
}

export default Country