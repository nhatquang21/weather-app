import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { config } from '@/config/env';
import { weatherKeys } from './queryKeys';
import { useWeatherStore } from '../stores/weatherStore';
import type { WeatherData } from '../types/weather';

export function useGetWeather(city: string, enabled: boolean = true) {
  const { setCurrentWeather, setLoading, setError } = useWeatherStore();

  const query = useQuery({
    queryKey: [...weatherKeys.all, 'current', city],
    queryFn: async (): Promise<WeatherData> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${config.apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'City not found. Please check the spelling and try again.'
          );
        }
        throw new Error(
          `Weather API error: ${response.status} ${response.statusText}`
        );
      }

      const data: WeatherData = await response.json();
      return data;
    },
    enabled: enabled && Boolean(city?.trim()),
    staleTime: 5 * 60 * 1000, // 5 minutes for current weather
    retry: (failureCount, error) => {
      // Don't retry on 404 (city not found)
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (query.data) {
      setCurrentWeather(query.data);
      setError(null);
      // Removed addToSearchHistory - this should only happen on explicit search
    }
  }, [query.data, setCurrentWeather, setError]);

  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  useEffect(() => {
    if (query.error) {
      setError(
        query.error instanceof Error ? query.error.message : 'An error occurred'
      );
    }
  }, [query.error, setError]);

  return query;
}
