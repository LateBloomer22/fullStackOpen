import React, { useState } from 'react'
import { useEffect } from 'react'
import weather from "../data/weather"
import Weather from './Weather'

const api_key = import.meta.env.VITE_WEATHER_API_KEY
console.log(api_key);

const Country = ({country}) => {
  const [cityWeather, setCityWeather] = useState();

  useEffect(() => {
    const [lat, long] = country.latlng;
    weather(lat, long, api_key).then(response => {setCityWeather(response)})
  }, [])

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
        <h2>Weather in {country.capital}</h2>
        {cityWeather ? <Weather weather={cityWeather} /> : <></>}
      </div>
    )
  }
// }

export default Country