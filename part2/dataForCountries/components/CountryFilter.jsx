import React from 'react'

const CountryFilter = ({filteredCountry, selectedCountry}) => {

  if (filteredCountry.length > 10) {
  return (
    <>
        <p>Too Many matches, specify another filter</p>
    </>
  )} 
  else if (filteredCountry.length === 1) {
    selectedCountry(filteredCountry[0][1])
    return (
      <ul>
        <li>
          {filteredCountry[0][1].name.common}
        </li>
      </ul>
    )
  }
  
  else {
    return (
      <>
      <ul>
        {filteredCountry.map(country => 
        <li key={country[0]}>{country[1].name.common} 
          <button onClick={() => selectedCountry(country[1])}>
            show
          </button>
        </li>)}
      </ul>
      </>
    )
  }
}

export default CountryFilter