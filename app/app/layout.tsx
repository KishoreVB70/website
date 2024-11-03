import React from 'react';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/lib/context/AuthContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </AuthProvider>
  );
}