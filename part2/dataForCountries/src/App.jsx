import React from "react"
import allCountries from "../data/countries"
import { useState, useEffect } from "react"
import CountryFilter from "../components/CountryFilter"

function App() {
  const [input, setInput] = useState('')
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

  return (
    <>
      <p>find countries</p>
      <input type="text" value={input} onChange={handleInput}/>

      {/* While typing */}
      <CountryFilter key={filteredCountry} filteredCountry={filteredCountry}/>
    </>
  )
}

export default App
