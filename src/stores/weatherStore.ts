import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { WeatherData, ForecastData, ForecastItem } from '@/types/weather';

interface WeatherState {
  // Current weather data
  currentWeather: WeatherData | null;
  forecast: ForecastItem[] | null;
  currentLocation: string;

  // UI states
  loading: boolean;
  error: string | null;

  // Search history
  searchHistory: string[];

  // Actions
  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: ForecastItem[]) => void;
  setCurrentLocation: (location: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToSearchHistory: (location: string) => void;
  clearSearchHistory: () => void;
  clearError: () => void;
  resetWeatherData: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentWeather: null,
        forecast: null,
        currentLocation: 'Singapore, SG',
        loading: false,
        error: null,
        searchHistory: [],

        // Actions
        setCurrentWeather: weather =>
          set(
            { currentWeather: weather, error: null },
            false,
            'setCurrentWeather'
          ),

        setForecast: forecast => set({ forecast }, false, 'setForecast'),

        setCurrentLocation: location =>
          set({ currentLocation: location }, false, 'setCurrentLocation'),

        setLoading: loading => set({ loading }, false, 'setLoading'),

        setError: error => set({ error, loading: false }, false, 'setError'),

        addToSearchHistory: location => {
          const { searchHistory } = get();
          const newHistory = [
            location,
            ...searchHistory.filter(item => item !== location),
          ].slice(0, 10); // Keep only last 10 searches

          set({ searchHistory: newHistory }, false, 'addToSearchHistory');
        },

        clearSearchHistory: () =>
          set({ searchHistory: [] }, false, 'clearSearchHistory'),

        clearError: () => set({ error: null }, false, 'clearError'),

        resetWeatherData: () =>
          set(
            {
              currentWeather: null,
              forecast: null,
              error: null,
              loading: false,
            },
            false,
            'resetWeatherData'
          ),
      }),
      {
        name: 'weather-store', // unique name for localStorage
        partialize: state => ({
          // Only persist these fields
          searchHistory: state.searchHistory,
          currentLocation: state.currentLocation,
        }),
      }
    ),
    {
      name: 'weather-store', // name in Redux DevTools
    }
  )
);
