/**
 * Utility functions for weather data formatting and processing
 */

import type { ForecastItemType } from '@/types/weather';

/**
 * Format temperature with proper unit display
 */
export function formatTemperature(
  temp: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius'
): string {
  const rounded = Math.round(temp);
  return unit === 'celsius' ? `${rounded}°C` : `${rounded}°F`;
}

/**
 * Convert temperature between units
 */
export function convertTemperature(
  temp: number,
  from: 'celsius' | 'fahrenheit',
  to: 'celsius' | 'fahrenheit'
): number {
  if (from === to) return temp;

  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9) / 5 + 32;
  } else {
    return ((temp - 32) * 5) / 9;
  }
}

/**
 * Get OpenWeatherMap icon URL
 */
export function getWeatherIconUrl(
  iconCode: string,
  size: '1x' | '2x' | '4x' = '2x'
): string {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

/**
 * Format wind speed with direction
 */
export function formatWind(speed: number, direction?: number): string {
  const speedText = `${Math.round(speed)} m/s`;

  if (direction === undefined) return speedText;

  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(direction / 22.5) % 16;

  return `${speedText} ${directions[index]}`;
}

/**
 * Format visibility distance
 */
export function formatVisibility(visibility: number): string {
  return `${visibility / 1000}`;
}

/**
 * Format pressure with unit
 */
export function formatPressure(pressure: number): string {
  return `${pressure} hPa`;
}

/**
 * Format humidity percentage
 */
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

/**
 * Get weather condition emoji
 */
export function getWeatherEmoji(weatherMain: string): string {
  const emojiMap: Record<string, string> = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
    Dust: '🌪️',
    Sand: '🌪️',
    Ash: '🌋',
    Squall: '🌪️',
    Tornado: '🌪️',
  };

  return emojiMap[weatherMain] || '🌤️';
}

/**
 * Format date for weather display
 */
export function formatWeatherDate(
  timestamp: number,
  type: 'short' | 'long' = 'short'
): string {
  const date = new Date(timestamp * 1000);

  if (type === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
  });
}

/**
 * Determine if timestamp is today
 */
export function isToday(timestamp: number): boolean {
  const today = new Date();
  const date = new Date(timestamp * 1000);

  return today.toDateString() === date.toDateString();
}

/**
 * Get time of day category
 */
export function getTimeOfDay(
  timestamp: number
): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date(timestamp * 1000).getHours();

  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

/**
 * Calculate comfort level based on temperature and humidity
 */
export function getComfortLevel(
  temp: number,
  humidity: number
): 'comfortable' | 'dry' | 'humid' | 'hot' | 'cold' {
  if (temp < 10) return 'cold';
  if (temp > 30) return 'hot';
  if (humidity < 30) return 'dry';
  if (humidity > 70) return 'humid';
  return 'comfortable';
}

// Group forecast items by date
export function groupForecastsByDate(forecasts: ForecastItemType[]) {
  const grouped: { [key: string]: ForecastItemType[] } = {};

  forecasts.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
}

// Format date for display
export function formatDateHeader(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });
}
