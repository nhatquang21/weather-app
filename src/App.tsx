import { QueryProvider } from '@/providers/QueryProvider';
import AppRouter from '@/routes/AppRouter';
import { StorageInitializer } from '@/components/StorageInitializer';

function App() {
  return (
    <QueryProvider>
      <StorageInitializer />
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
