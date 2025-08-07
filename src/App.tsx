import { QueryProvider } from './providers/QueryProvider';
import { WeatherApp } from './components/WeatherApp';

function App() {
  return (
    <QueryProvider>
      <WeatherApp />
    </QueryProvider>
  );
}

export default App;
