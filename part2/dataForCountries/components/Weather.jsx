import React from 'react'

const Weather = ({weather}) => {
    
    if (weather === undefined){
        return null;
    }

    let tempInCel = (weather.main.temp - 273).toFixed(2)
    console.log(weather, tempInCel);
  return (
    <>
        <p>Temperature {tempInCel} Celcius</p>
        {/* <p>Weather icon</p> */}
        <p>Wind {weather.wind.speed}</p>
    </>
  )
}

export default Weather