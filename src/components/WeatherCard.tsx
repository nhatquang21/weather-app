import { useGetWeather } from '@/hooks/useGetWeather';
import { useWeatherStore } from '@/stores/weatherStore';
import {
  formatTemperature,
  formatVisibility,
  getWeatherIconUrl,
} from '@/utils/weatherUtils';
import { LoadingCard } from './LoadingCard';
import { WindDirection } from './WindDirection';

const WeatherStat = ({
  title,
  value,
  unit,
  element,
}: {
  title: string;
  value?: string;
  unit?: string;
  element?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center flex-col rounded-lg p-3">
      <div className="text-gray-400 mb-1">{title}</div>
      <div className="font-semibold text-lg text-black">
        {element || (
          <>
            {value}{' '}
            <span className="text-black font-semibold text-sm"> {unit} </span>
          </>
        )}
      </div>
    </div>
  );
};

export function WeatherCard() {
  const { currentWeather, loading, currentLocation } = useWeatherStore();
  useGetWeather(currentLocation);

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

            <div className="grid grid-cols-3 gap-4 text-sm">
              <WeatherStat
                title={'Humidity'}
                value={`${currentWeather.main.humidity}`}
                unit="%"
              />
              <WeatherStat
                title="Winds"
                element={
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {currentWeather.wind.deg !== undefined && (
                        <span
                          className="text-sm font-bold inline-block transition-transform duration-300"
                          style={{
                            transform: `rotate(${currentWeather.wind.deg}deg)`,
                            transformOrigin: 'center',
                          }}
                        >
                          ↓
                        </span>
                      )}
                      <span>{currentWeather.wind.speed.toFixed(1)}</span>
                    </div>
                    <span className="text-black font-semibold text-sm">
                      m/s
                    </span>
                  </div>
                }
              />
              <WeatherStat
                title="Visibility"
                value={`${formatVisibility(currentWeather.visibility)}`}
                unit="km"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
