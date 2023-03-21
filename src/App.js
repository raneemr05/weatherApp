import React, {useState} from 'react'
import axios from 'axios';

export default function App() {

  const[data,setData] = useState({})
  const[location, setLocation] = useState('')

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7cd2eeeb7260f2e7c568ace6cbcf0ac6`
  
   const searchLocation = (event) =>{

    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('') 
   }
  }
  return (
    <div className="app">
      <div className='title'>
        <h2>Weather App</h2>
      </div>
        <div className='search'>
          <input 
          type="text"
          value={location}
          onChange = {event => setLocation(event.target.value)}
          onKeyPress = {searchLocation}
          placeholder='Enter Location'
          />
        </div>
        <div className='container'>
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temp'>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1>:null}           
            </div>
            <div className='desc'>
            {data.weather ? <p className='text'>{data.weather[0].main}</p>:null}
            {data.weather ? <p className='text'>{data.weather[0].description}</p>:null}    
            </div>
          </div>
          {data.name !== undefined
          &&
          <div className='bottom'>
            <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p>:null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity} %</p>:null}
              <p className='label'>Humidity</p>
            </div>
            <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p>:null}
              <p className='label'>Wind Speed</p>
            </div>
          </div>
          }
          <div className='footer'>
            <p>Weather data powered by https://openweathermap.org/</p>
          </div>
        </div>
    </div>
  );
}
