// Base weather types
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number; // Temperature difference for forecast
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number; // Cloudiness percentage
}

export interface Sys {
  pod?: 'd' | 'n'; // Part of day (day/night) for forecast
  country?: string; // For current weather
  sunrise?: number; // For current weather
  sunset?: number; // For current weather
}

export interface Coordinates {
  lat: number;
  lon: number;
}

// Current Weather Data (from /weather endpoint)
export interface WeatherData {
  coord?: Coordinates;
  weather: WeatherCondition[];
  base?: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds?: Clouds;
  dt: number; // Unix timestamp
  sys: Sys;
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
}

// Forecast Item (individual forecast entry)
export interface ForecastItemType {
  dt: number; // Unix timestamp
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation (0-1)
  sys: Sys;
  dt_txt: string; // Date and time in text format "YYYY-MM-DD HH:MM:SS"
}

// City information in forecast response
export interface CityInfo {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

// 5-day Forecast Data (from /forecast endpoint)
export interface ForecastData {
  cod: string; // Internal parameter
  message: number; // Internal parameter
  cnt: number; // Number of forecast items
  list: ForecastItemType[];
  city: CityInfo;
}

// API Response wrapper types
export interface WeatherApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
}

export interface ForecastApiResponse {
  success: boolean;
  data?: ForecastData;
  error?: string;
}

// Utility types for processing
export interface DailyForecast {
  date: string;
  items: ForecastItemType[];
  minTemp: number;
  maxTemp: number;
  dominantWeather: WeatherCondition;
}

// Weather icons mapping
export type WeatherIconCode =
  | '01d'
  | '01n' // clear sky
  | '02d'
  | '02n' // few clouds
  | '03d'
  | '03n' // scattered clouds
  | '04d'
  | '04n' // broken clouds
  | '09d'
  | '09n' // shower rain
  | '10d'
  | '10n' // rain
  | '11d'
  | '11n' // thunderstorm
  | '13d'
  | '13n' // snow
  | '50d'
  | '50n'; // mist

// Weather condition main types
export type WeatherMain =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado';

// Units constants
export const TemperatureUnit = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
  KELVIN: 'standard',
} as const;

export const WindSpeedUnit = {
  METER_PER_SEC: 'metric',
  MILES_PER_HOUR: 'imperial',
} as const;

export type TemperatureUnitType =
  (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
export type WindSpeedUnitType =
  (typeof WindSpeedUnit)[keyof typeof WindSpeedUnit];
