import React, { useState, useEffect } from 'react';
import './Weather.css'; // Import CSS file

import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";

function Header({ setLocation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setLocation(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="header">
      <h1>.Weather App</h1>
      <br />
      <br />

      <input
        type="text"
        placeholder="Enter location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      <div className='Button'>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

function WeatherDisplay({ location }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = '2c4a1fa753f606860fb5b5288c86b884';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, [location]);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode === 'Clear') {
      return <TiWeatherSunny />;
    } else if (weatherCode === 'Clouds') {
      return <TiWeatherCloudy />;
    } else if (weatherCode === 'Rain') {
      return <TiWeatherDownpour />;
    } else {
      return <TiWeatherWindyCloudy />;
    }
  };

  return (
    <div className="weather-display">
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          {weatherData.weather ? (
            <>
              <p>{weatherData.main.temp}°C</p>
              <div className="weather-icons">
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
            </>
          ) : (
            <p>Temperature information not available</p>
          )}
        </>
      ) : (
        <p>Enter a location to get weather information</p>
      )}
    </div>
  );
}

function App() {
  const [location, setLocation] = useState('');

  return (
    <div className="App">
      <Header setLocation={setLocation} />
      <WeatherDisplay location={location} />
    </div>
  );
}

export default App;
