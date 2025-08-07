import type { ForecastItem } from '@/types/weather';
import { getWeatherIconUrl } from '@/utils/weatherUtils';
import { memo } from 'react';

export const ForeCastItem = memo(({ item }: { item: ForecastItem }) => {
  const timeString = item.dt_txt.split(' ')[1].slice(0, 5);

  return (
    <div className="flex items-center justify-between py-3 px-2 bg-white/5 rounded-lg">
      {/* Time */}
      <div className="text-black/80 text-md font-bold me-2 min-w-[60px]">
        {timeString}
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-start flex-1 gap-2">
        <img
          src={getWeatherIconUrl(item.weather[0].icon)}
          alt={item.weather[0].description}
          className="w-8 h-8 drop-shadow-lg"
        />
        <span className="text-gray-500 text-sm ">
          {item.main.temp_min} / {item.main.temp_max}°C
        </span>
      </div>

      {/* Temperature and Description */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className="text-black/80 font-bold text-sm ">
          {item.weather[0].description}
        </span>
      </div>
    </div>
  );
});
