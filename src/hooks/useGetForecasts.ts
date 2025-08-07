import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { config } from '../config/env';
import { weatherKeys } from './queryKeys';
import { useWeatherStore } from '../stores/weatherStore';
import type { ForecastData } from '../types/weather';

// Hook để fetch 5-day forecast by city và auto update store
// Calls: https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API key}
export function useGetForecasts(city: string, enabled: boolean = true) {
  const { setForecast, setLoading, setError } = useWeatherStore();

  const query = useQuery({
    queryKey: [...weatherKeys.all, 'forecast', city],
    queryFn: async (): Promise<ForecastData> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${config.apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'City not found for forecast. Please check the spelling and try again.'
          );
        }
        throw new Error(
          `Forecast API error: ${response.status} ${response.statusText}`
        );
      }

      const data: ForecastData = await response.json();
      return data;
    },
    enabled: enabled && Boolean(city?.trim()),
    staleTime: 15 * 60 * 1000, // 15 minutes for forecast (longer than current weather)
    retry: (failureCount, error) => {
      // Don't retry on 404 (city not found)
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (query.data?.list?.length) {
      setForecast(query.data.list);
      setError(null);
    }
  }, [query.data, setForecast, setError]);

  // Auto update loading state
  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  // Auto update error state
  useEffect(() => {
    if (query.error) {
      setError(
        query.error instanceof Error ? query.error.message : 'An error occurred'
      );
    }
  }, [query.error, setError]);

  return query;
}
