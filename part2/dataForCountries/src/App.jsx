import React from "react"
import allCountries from "../data/countries"
import { useState, useEffect } from "react"
import Country from "../components/Country";
import CountryFilter from "../components/CountryFilter";

// Remaining for 30th Oct
// 1. Add weather display
// 2. When the country filter changes from one entry to multiple, the display should dissappear till user selects another country
// 3. Console showing another error -> resolve that as well

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

  const selectedCountry = (country) => {
    setCountry(country)
    console.log(country);
  }
  
  return (
    <>
      <p>find countries</p>
      <input type="text" value={input} onChange={handleInput}/>

      {/* While typing */}
      <CountryFilter filteredCountry={filteredCountry} selectedCountry={selectedCountry}/>
      
      {/* When one result found or selected*/}
      <Country country={country}/>
    </>
  )
}

export default App
