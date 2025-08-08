import { SearchBox, SearchHistory } from './components';

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <SearchBox />
      <SearchHistory />
    </div>
  );
}
