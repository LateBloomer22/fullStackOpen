import React from "react"
import allCountries from "../data/countries"
import { useState, useEffect } from "react"
import Country from "../components/Country";
import CountryFilter from "../components/CountryFilter";

function App() {
  const [input, setInput] = useState('')
  const [country, setCountry] = useState({})
  const [countryList, setCountryList] = useState([])
  const [filteredCountry, setFilteredCountry] = useState([])

  useEffect(() => {
    allCountries().then(result => {
      setCountryList(Object.entries(result))
    })
  }, [])

  const handleInput= (event) => {
    setInput(event.target.value)
    setFilteredCountry(countryList.filter(country => country[1].name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  if(filteredCountry.length === 1){
    setCountry(filteredCountry[1])
    // setCountry(countryList)
  }
  
  return (
    <>
      <p>find countries</p>
      <input type="text" value={input} onChange={handleInput}/>

      {/* While typing */}
      <CountryFilter filteredCountry={filteredCountry}/>
      

      {/* When one result found or selected*/}
      {/* <Country country={country}/> */}
    </>
  )
}

export default App
