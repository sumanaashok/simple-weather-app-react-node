
import './App.css';
import React, { useState } from 'react';
import SearchCity from './sections/search_city/search_city';
import DisplayWeather from './sections/display_weather/display_weather';


function App() {
  
  // React app making a request to the node server to fetch weather information.
  let callWeatherAPI = async (lat,lon) => {
    const response = await fetch(`/current-weather?lat=${lat}&lon=${lon}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  // whenever the search/city changes, the state is observed and weather api is called again.
  let [currentWeather, setCurrentWeather] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    callWeatherAPI(lat,lon)
      .then(res => {
        const weatherResponse = res;
        setCurrentWeather({ city: searchData.label, ...weatherResponse});
      })
      .then(
        console.log('this is the current weather - ', currentWeather)
      )
      .catch(err => console.log(err));


  }
  return (
    <div>
      <div className="title">Weather App</div>
      <div className="Display_blocks">
        <SearchCity onSearchChange={handleOnSearchChange} />
        {currentWeather && < DisplayWeather data={currentWeather} />}
      </div>
    </div>
  );
}

export default App;