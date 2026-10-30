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
        <p>{weather.weather[0].description} </p>
        <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} />
        {/* <p>Weather icon</p> */}
        <p>Wind {weather.wind.speed}</p>
    </>
  )
}

export default Weather