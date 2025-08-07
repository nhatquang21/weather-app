import { ForecastList } from './ForecastList';
import { WeatherCard } from './WeatherCard';
import { CurrentLocation } from './CurrentLocation';

export function WeatherApp() {
  return (
    <div className="min-h-screen">
      <div className=" max-w-md  mx-auto">
        <CurrentLocation />
      </div>
      <div className="p-4 bg-slate-200">
        <div className=" max-w-md  mx-auto ">
          <WeatherCard />
          <ForecastList />
        </div>
      </div>
    </div>
  );
}
