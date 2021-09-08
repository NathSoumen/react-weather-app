import react, { useState } from 'react'
import {fetchWeather} from './api/fetchWeather'

import './App.css'

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})  

  async function apiSubmit() {
    const data = await fetchWeather(query)

    setWeather(data)
    setQuery('')
  }
  const search = async (e) => {
    if (e.key === 'Enter') {
      apiSubmit()
    }
  }
  const searchButon = () => {
    apiSubmit()
  }
  return (
    <div className="main-container">
      <div className="input-handle">
      <input type='text' 
      className='search' 
      placeholder='Search ...' 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={search}
      />
     <button onClick={searchButon} id="search_button"><i class="fas fa-search"></i></button>
     </div>


      {weather.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className='info'>
            <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
