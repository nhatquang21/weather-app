import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useWeatherStore } from '@/stores/weatherStore';
import { useNavigate } from 'react-router-dom';

export function SearchHistory() {
  const { searchHistory, setCurrentLocation, removeFromSearchHistory } =
    useWeatherStore();
  const navigate = useNavigate();

  const handleSearch = (location: string) => {
    // Directly set current location without adding to history again
    setCurrentLocation(location);
    navigate('/');
  };

  const handleDelete = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromSearchHistory(location);
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="text-base font-medium text-gray-900">Search History</h3>
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="max-h-96 overflow-y-auto">
          {searchHistory.map((location, index) => (
            <div
              key={`location-${location}-${index}`}
              className="flex items-center justify-between px-4 py-3  border-gray-100 "
            >
              <span className="text-gray-900 text-sm">{location}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSearch(location)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                  title="Search this location"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={e => handleDelete(location, e)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                  title="Remove from history"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
