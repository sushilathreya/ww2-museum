import { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense>
        <Sidebar />
      </Suspense>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
