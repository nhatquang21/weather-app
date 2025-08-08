import type { ReactNode } from 'react';
import { CurrentLocation } from '@/components/CurrentLocation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="px-4 md:px-0 max-w-md mx-auto">
        <CurrentLocation />
      </div>
      <div className="p-4 bg-slate-200">
        <div className="max-w-md mx-auto min-h-screen">{children}</div>
      </div>
    </div>
  );
}
