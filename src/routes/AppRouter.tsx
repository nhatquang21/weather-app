import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';

// Lazy import components
const WeatherApp = lazy(() => import('@/pages/HomePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-200">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Redirect any unknown routes to homepage */}
            <Route path="*" element={<WeatherApp />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
