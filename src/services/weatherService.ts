import { config } from '../config/env';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${config.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          `Weather API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Sử dụng config.apiKey một cách an toàn
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          `Weather API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      throw error;
    }
  }

  async get5DayForecast(city: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${config.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          `Forecast API error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const weatherService = new WeatherService();
