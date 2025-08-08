import type { ForecastItemType } from '@/types/weather';
import { getWeatherIconUrl } from '@/utils/weatherUtils';
import { memo } from 'react';

export const ForecastItem = memo(({ item }: { item: ForecastItemType }) => {
  const timeString = item.dt_txt.split(' ')[1].slice(0, 5);

  return (
    <div className="flex items-center justify-between py-3 px-2 bg-white/5 rounded-lg">
      {/* Time */}
      <div className="text-black/80 text-sm sm:text-md font-bold me-2 min-w-[50px] sm:min-w-[60px]">
        {timeString}
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-start flex-1 gap-1 sm:gap-2">
        <img
          src={getWeatherIconUrl(item.weather[0].icon)}
          alt={item.weather[0].description}
          className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg flex-shrink-0"
        />
        <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
          {item.main.temp_min} / {item.main.temp_max}°C
        </span>
      </div>

      {/* Temperature and Description */}
      <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end">
        <span className="text-black/80 font-bold text-xs sm:text-sm text-right">
          {item.weather[0].description}
        </span>
      </div>
    </div>
  );
});
