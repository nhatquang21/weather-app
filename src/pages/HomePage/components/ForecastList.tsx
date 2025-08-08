import { useWeatherStore } from '@/stores/weatherStore';
import type { ForecastItemType } from '@/types/weather';
import { ForecastItem } from './ForecastItem';
import { useMemo } from 'react';
import { formatDateHeader, groupForecastsByDate } from '@/utils/weatherUtils';

export const ForecastList = () => {
  const { forecast } = useWeatherStore();

  const groupedForecasts = useMemo(() => {
    if (!forecast) return {};
    return groupForecastsByDate(forecast);
  }, [forecast]);

  const dateKeys = useMemo(() => {
    return Object.keys(groupedForecasts);
  }, [groupedForecasts]);

  if (!forecast) {
    return null;
  }

  return (
    <>
      <h3 className=" font-medium mb-3">5-Day Forecast (3 Hours)</h3>
      <div className="bg-white backdrop-blur-md rounded-xl p-4 mb-4 shadow-2xl">
        <div className="space-y-4">
          {dateKeys.map(dateKey => (
            <div key={dateKey}>
              {/* Date Header */}
              <div className="text-gray-500 text-sm  mb-2 px-2">
                {formatDateHeader(dateKey)}
              </div>

              {/* Forecast Items for this date */}
              <div className="space-y-1">
                {groupedForecasts[dateKey].map((item: ForecastItemType) => (
                  <ForecastItem key={item.dt} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
