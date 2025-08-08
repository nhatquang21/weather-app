import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeatherData } from '@/hooks/useWeatherData';
import { useWeatherStore } from '@/stores/weatherStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchLocation, loading, pendingLocation, error, setError } =
    useWeatherStore();
  const navigate = useNavigate();
  const [wasSearching, setWasSearching] = useState(false);

  // Use weather data hook to trigger API calls
  useWeatherData();

  // Listen for search success/error
  useEffect(() => {
    if (wasSearching && !pendingLocation) {
      // Search completed
      if (!error) {
        // Success - navigate to homepage
        navigate('/');
        setSearchTerm(''); // Clear search input
      }
      // Error case - stay on search page, error will be displayed
      setWasSearching(false);
    }
  }, [wasSearching, pendingLocation, error, navigate]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setWasSearching(true);
      searchLocation(searchTerm.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="space-y-1">
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <Input
          type="text"
          placeholder="Search country or city here..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            if (error) {
              setError(null);
            }
          }}
          className="flex-1 h-10 px-4 bg-gray-50 border-gray-200 rounded-lg placeholder:text-gray-500 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        <Button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-300"
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {/* Error Display */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {loading && <LoadingSpinner />}
    </div>
  );
};
