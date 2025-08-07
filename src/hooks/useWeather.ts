import { useState, useEffect } from 'react';
import { weatherService, type WeatherData } from '../services/weatherService';

interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeather(city: string): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Sử dụng weatherService (đã có API key được config sẵn)
      const weatherData = await weatherService.getCurrentWeather(city);
      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return {
    data,
    loading,
    error,
    refetch: fetchWeather,
  };
}

export function useGeolocationWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Sử dụng weatherService với coordinates
      const weatherData = await weatherService.getWeatherByCoords(latitude, longitude);
      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location or weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchWeatherByLocation,
  };
}
