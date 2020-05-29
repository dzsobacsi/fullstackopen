import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

function App() {
  const [ searchTerm, setSearchTerm] = useState('')
  const [ countries, setCountries ]  = useState([])
  const [ weather, setWeather ]      = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Restcountries API call - promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleClick = (country) => {
    //console.log('click on', country)
    setSearchTerm(country)
  }

  const updateWeather = (city, iconCode) => {
    //console.log('updateWeather fired from', city)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    axios
      .get(apiUrl)
      .then(response => {
        console.log('Openweathermap API call - promise fulfilled')
        setWeather(response.data)
      })
  }

  return (
    <>
      <h1>Data for Countries</h1>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <br/>
      <Countries  countries={countries}
                  searchTerm={searchTerm}
                  handleClick={handleClick}
                  weather={weather}
                  updateWeather={updateWeather} />
    </>
  )
}

export default App
