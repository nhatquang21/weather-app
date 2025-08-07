import React, { useState } from 'react';
import { useWeather, useGeolocationWeather } from '../hooks/useWeather';

export function WeatherApp() {
  const [city, setCity] = useState('Ho Chi Minh City');
  const [searchCity, setSearchCity] = useState('');
  
  // Sử dụng hook để lấy weather data (API key đã được handle tự động)
  const { data: weatherData, loading, error, refetch } = useWeather(city);
  const { 
    data: locationWeather, 
    loading: locationLoading, 
    error: locationError 
  } = useGeolocationWeather();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather App
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 rounded-lg border-0 shadow-lg"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Results */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Weather in {city}
            </h2>
            
            {loading && (
              <div className="text-white">Loading weather data...</div>
            )}
            
            {error && (
              <div className="text-red-200 bg-red-500/20 p-4 rounded-lg">
                Error: {error}
                <button 
                  onClick={refetch}
                  className="ml-4 px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30"
                >
                  Retry
                </button>
              </div>
            )}
            
            {weatherData && (
              <WeatherCard data={weatherData} />
            )}
          </div>

          {/* Current Location */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Location
            </h2>
            
            {locationLoading && (
              <div className="text-white">Getting your location...</div>
            )}
            
            {locationError && (
              <div className="text-red-200 bg-red-500/20 p-4 rounded-lg">
                {locationError}
              </div>
            )}
            
            {locationWeather && (
              <WeatherCard data={locationWeather} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface WeatherCardProps {
  data: any; // Use proper type from weatherService
}

function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">{data.name}, {data.sys.country}</h3>
          <p className="text-blue-100 capitalize">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-blue-100 text-sm">Temperature</p>
          <p className="text-2xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-sm">Feels like {Math.round(data.main.feels_like)}°C</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-blue-100 text-sm">Humidity</p>
          <p className="text-2xl font-bold">{data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
