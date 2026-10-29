import React from 'react'

const Country = ({country}) => {
  if(Object.keys(country).length === 0) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div>
          <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(language => 
            <li key={language[0]}>
              {language[1]}
            </li>
          )}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        {/* <h2>Weather in Country</h2>
        <p>Temperature</p>
        <p>Weather icon</p>
        <p>Wind speed</p> */}
      </div>
    )
  }
}

export default Country