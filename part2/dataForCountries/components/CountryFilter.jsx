import React from 'react'

const CountryFilter = ({filteredCountry}) => {

  if (filteredCountry.length > 10) {
  return (
    <>
        <p>Too Many matches, specify another filter</p>
    </>
  )} 
  // else if (filteredCountry.length === 1) {
  //   return
  // }
  
  else {
    return (
      <>
      <ul>
        {filteredCountry.map(country => 
        <li key={country[0]}>{country[1].name.common} 
          {/* <button>
            show
          </button> */}
        </li>)}
      </ul>
      </>
    )
  }
}

export default CountryFilter