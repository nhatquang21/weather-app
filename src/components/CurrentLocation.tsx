import { useWeatherStore } from '@/stores/weatherStore';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function CurrentLocation() {
  const { currentLocation } = useWeatherStore();

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 px-0">
      <div className="flex items-center gap-1">
        <MapPinIcon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-800 font-bold">{currentLocation}</span>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
