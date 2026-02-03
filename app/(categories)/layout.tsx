'use client';

import { Suspense, useState, useCallback } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Suspense>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
