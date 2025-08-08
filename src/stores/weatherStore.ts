import type { ForecastItemType, WeatherData } from '@/types/weather';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  saveEncryptedToStorage,
  loadEncryptedFromStorage,
} from '@/utils/encryption';

interface WeatherStorageData {
  currentLocation: string;
  searchHistory: string[];
}

interface WeatherState {
  // Current weather data
  currentWeather: WeatherData | null;
  forecast: ForecastItemType[] | null;
  currentLocation: string;
  pendingLocation: string | null; // Location being searched

  // UI states
  loading: boolean;
  error: string | null;

  // Search history
  searchHistory: string[];

  // Actions
  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: ForecastItemType[]) => void;
  setCurrentLocation: (location: string) => void;
  setPendingLocation: (location: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToSearchHistory: (location: string) => void;
  removeFromSearchHistory: (location: string) => void;
  loadFromStorage: () => void; // Combined load action
  saveToStorage: () => void; // Combined save action

  searchLocation: (location: string) => void; // New search action
  onSearchSuccess: (location: string) => void; // Called when API success
}

export const useWeatherStore = create<WeatherState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentWeather: null,
      forecast: null,
      currentLocation: 'Singapore, SG',
      pendingLocation: null,
      loading: false,
      error: null,
      searchHistory: [],

      // Actions
      setCurrentWeather: (weather: WeatherData) =>
        set(
          { currentWeather: weather, error: null },
          false,
          'setCurrentWeather'
        ),

      setForecast: (forecast: ForecastItemType[]) =>
        set({ forecast }, false, 'setForecast'),

      setCurrentLocation: (location: string) => {
        set({ currentLocation: location }, false, 'setCurrentLocation');
        // Save to storage after state update
        const { saveToStorage } = get();
        saveToStorage();
      },

      setPendingLocation: (location: string | null) =>
        set({ pendingLocation: location }, false, 'setPendingLocation'),

      setLoading: (loading: boolean) => set({ loading }, false, 'setLoading'),

      setError: (error: string | null) =>
        set({ error, loading: false }, false, 'setError'),

      // New search flow actions
      searchLocation: (location: string) => {
        set(
          {
            pendingLocation: location,
            loading: true,
            error: null,
          },
          false,
          'searchLocation'
        );
      },

      onSearchSuccess: (location: string) => {
        const { addToSearchHistory } = get();
        set(
          {
            currentLocation: location,
            pendingLocation: null,
            loading: false,
            error: null,
          },
          false,
          'onSearchSuccess'
        );
        addToSearchHistory(location);
      },

      addToSearchHistory: (location: string) => {
        const { searchHistory, saveToStorage } = get();

        const newHistory = [
          location, // Thêm vào đầu
          ...searchHistory.filter((item: string) => item !== location),
        ].slice(0, 10); // Giới hạn 10 items

        set({ searchHistory: newHistory }, false, 'addToSearchHistory');

        // Save combined data to storage
        saveToStorage();
      },

      removeFromSearchHistory: (location: string) => {
        const { searchHistory, saveToStorage } = get();
        const newHistory = searchHistory.filter(
          (item: string) => item !== location
        );
        set({ searchHistory: newHistory }, false, 'removeFromSearchHistory');

        // Save combined data to storage
        saveToStorage();
      },

      saveToStorage: () => {
        const { currentLocation, searchHistory } = get();
        const storageData: WeatherStorageData = {
          currentLocation,
          searchHistory,
        };

        saveEncryptedToStorage('weather-app-data', storageData);
      },

      loadFromStorage: () => {
        const storedData =
          loadEncryptedFromStorage<WeatherStorageData>('weather-app-data');

        if (storedData && typeof storedData === 'object') {
          // Data exists, load it
          const updates: Partial<{
            currentLocation: string;
            searchHistory: string[];
          }> = {};

          if (
            storedData.currentLocation &&
            typeof storedData.currentLocation === 'string'
          ) {
            updates.currentLocation = storedData.currentLocation;
          }

          if (
            storedData.searchHistory &&
            Array.isArray(storedData.searchHistory)
          ) {
            updates.searchHistory = storedData.searchHistory;
          }

          if (Object.keys(updates).length > 0) {
            set(updates, false, 'loadFromStorage');
          }
        } else {
          // No data exists, initialize with default and save it

          const defaultData: WeatherStorageData = {
            currentLocation: 'Singapore, SG',
            searchHistory: ['Singapore, SG'], // Add Singapore to history by default
          };

          set(
            {
              currentLocation: defaultData.currentLocation,
              searchHistory: defaultData.searchHistory,
            },
            false,
            'loadFromStorage'
          );

          // Save the default data to storage
          saveEncryptedToStorage('weather-app-data', defaultData);
        }
      },
    }),
    {
      name: 'weather-store',
    }
  )
);
