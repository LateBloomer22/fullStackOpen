import React, { useState, useEffect } from 'react'
import Country from './Country'

const CountryFilter = ({filteredCountry}) => {
  const [country, setCountry] = useState()

  if (filteredCountry.length > 10) {
  return (
    <>
        <p>Too Many matches, specify another filter</p>
    </>
  )} 
  else if (filteredCountry.length === 1) {
    // selectedCountry(filteredCountry[0][1])
    return (
      <>
        <ul>
          <li>
            {filteredCountry[0][1].name.common}
          </li>
        </ul>
        <Country country={filteredCountry[0][1]} />
      </>
    )
  }
  else {
    return (
      <>
        <ul>
          {filteredCountry.map(country => 
          <li key={country[0]}>{country[1].name.common} 
            <button onClick={() => setCountry(country[1])}>
              show
            </button>
          </li>)}
        </ul>
        {country ? <Country country={country} /> : <></>}
      </>
    )
  }
}

export default CountryFilter