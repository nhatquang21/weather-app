import { useEffect } from 'react';
import { useWeatherStore } from '@/stores/weatherStore';

export function StorageInitializer() {
  const { loadFromStorage } = useWeatherStore();

  useEffect(() => {
    // Load both currentLocation and searchHistory from storage on app start
    loadFromStorage();
  }, [loadFromStorage]);

  return null; // This component doesn't render anything
}
