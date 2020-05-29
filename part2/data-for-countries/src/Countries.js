import React from 'react'
import Country from './Country'

const Countries = ({ countries, searchTerm, handleClick, weather, updateWeather }) => {
  /*const countryList = countries
    .map(c => c.name)
    .map(c => c.toLowerCase())
    .filter(c => c.indexOf(searchTerm.toLowerCase()) !== -1)*/

  const indexList = countries
    .map(c => c.name)
    .map(c => c.toLowerCase())
    .map((c, i) => c.indexOf(searchTerm.toLowerCase()) !== -1 ? i : -1)
    .filter(i => i !== -1)

  //console.log(countryList)
  //console.log(indexList)

  if (indexList.length > 10) {
    return (
      <p>Too many countries, specify another filter</p>
    )
  }
  else if (indexList.length === 0) {
    return (
      <p>There is no such country, specify another filter</p>
    )
  }

    else {
    return (
      <>
        {countries
          .filter((c, i) => indexList.includes(i))
          .map((c, i) =>
            <Country key={i}
                     country={c}
                     handleClick={handleClick}
                     weather={weather}
                     updateWeather={updateWeather}
                     full={indexList.length === 1}/>)
        }
      </>
    )
  }
}

export default Countries
