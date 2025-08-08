import type { WeatherData } from '@/types/weather';
import { formatVisibility } from '@/utils/weatherUtils';
import { memo } from 'react';

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

export const WeatherStats = memo(
  ({ currentWeather }: { currentWeather: WeatherData }) => {
    return (
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
              <span className="text-black font-semibold text-sm">m/s</span>
            </div>
          }
        />
        <WeatherStat
          title="Visibility"
          value={`${formatVisibility(currentWeather.visibility)}`}
          unit="km"
        />
      </div>
    );
  }
);
