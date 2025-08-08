import { useWeatherData } from '@/hooks/useWeatherData';
import { useWeatherStore } from '@/stores/weatherStore';
import { formatTemperature, getWeatherIconUrl } from '@/utils/weatherUtils';
import { LoadingCard } from '@/components/LoadingCard';
import { WeatherStats } from './WeatherStats';

export function WeatherCard() {
  const { currentWeather, loading } = useWeatherStore();
  useWeatherData();

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <>
      {/* Current Weather */}
      {currentWeather && (
        <div className="bg-white backdrop-blur-md rounded-xl p-4 mb-5 shadow-2xl">
          <p>
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-16 mb-2">
              <img
                src={getWeatherIconUrl(currentWeather.weather[0].icon, '4x')}
                alt={currentWeather.weather[0].description}
                className="w-32 h-32"
              />
              <div>
                <div className="text-5xl text-black">
                  {formatTemperature(currentWeather.main.temp)}
                </div>
                <div className="text-black text-xl capitalize">
                  {currentWeather.weather[0].description}
                </div>
              </div>
            </div>
            <WeatherStats currentWeather={currentWeather} />
          </div>
        </div>
      )}
    </>
  );
}
