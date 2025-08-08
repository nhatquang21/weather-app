import { useWeatherStore } from '@/stores/weatherStore';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export function CurrentLocation() {
  const { currentLocation } = useWeatherStore();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white rounded-xl py-4 px-0">
      <div className="flex items-center gap-1">
        <MapPinIcon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-800 font-bold">{currentLocation}</span>
      </div>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={async () => {
          navigate('/search');
        }}
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
