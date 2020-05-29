import React, {  useEffect } from 'react'
import Language from './Language'

const fixTemp = temp => Math.round((parseFloat(temp) - 273.15) * 10) / 10
const fixWind = speed => Math.round((parseFloat(speed) * 3.6) * 10) / 10

const Country = ({ country, full, handleClick, weather, updateWeather }) => {
  const imgUrl = weather.main === undefined
    ? ''
    : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  useEffect(() => {
    if (full) {
      updateWeather(country.capital)
    }
  }, [full])

  if (!full) return (
    <p>
      {country.name} <button onClick={() => handleClick(country.name)}> show </button><br/>
    </p>
  )
  else {
    //console.log(weather);
    return (
      <>
        <h2>{country.name}</h2>
        <p>
          Capital: {country.capital}<br/>
          Population: {country.population}
        </p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((l, i) => <Language key={i} language={l}/>)}
        </ul>
        <img src={country.flag} alt="flag" height={100} width={100} />
        <h3>Weather in {country.capital}</h3>
        <p>
          <b>Temperature: </b> {weather.main === undefined ? 'loading...' : fixTemp(weather.main.temp)} °C<br/>
          <b>Wind: </b> {weather.main === undefined ? 'loading...' : fixWind(weather.wind.speed)} km/h<br/>
          <img src={imgUrl} alt="weather icon" />
        </p>
      </>
    )
  }
}

export default Country
