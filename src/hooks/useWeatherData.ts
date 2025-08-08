import { useGetWeather } from './useGetWeather';
import { useGetForecasts } from './useGetForecasts';
import { useWeatherStore } from '@/stores/weatherStore';
import { useEffect } from 'react';

/**
 * Custom hook that triggers both weather and forecast fetching
 * when pendingLocation changes, and handles success/error states
 */
export function useWeatherData() {
  const { currentLocation, pendingLocation, onSearchSuccess, setError } =
    useWeatherStore();

  // Use pendingLocation for API calls, fallback to currentLocation
  const searchCity = pendingLocation || currentLocation;

  // Fetch current weather
  const weatherQuery = useGetWeather(searchCity, Boolean(searchCity));

  // Fetch 5-day forecast
  const forecastQuery = useGetForecasts(searchCity, Boolean(searchCity));

  // Handle success case - both APIs succeeded
  useEffect(() => {
    if (weatherQuery.data && forecastQuery.data && pendingLocation) {
      onSearchSuccess(pendingLocation);
    }
  }, [weatherQuery.data, forecastQuery.data, pendingLocation, onSearchSuccess]);

  // Handle error case - any API failed
  useEffect(() => {
    if ((weatherQuery.error || forecastQuery.error) && pendingLocation) {
      setError('Invalid city or country');
    }
  }, [weatherQuery.error, forecastQuery.error, pendingLocation, setError]);

  // Function to manually refetch both queries
  const refetchAll = async () => {
    await Promise.all([weatherQuery.refetch(), forecastQuery.refetch()]);
  };

  return {
    weather: weatherQuery,
    forecast: forecastQuery,
    isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
    hasError: Boolean(weatherQuery.error || forecastQuery.error),
    errors: {
      weather: weatherQuery.error,
      forecast: forecastQuery.error,
    },
    refetchAll,
  };
}
