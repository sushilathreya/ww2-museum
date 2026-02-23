'use client';

import { Suspense, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const exploreLinks = [
    { href: '/timeline', label: 'Timeline' },
    { href: '/top-weapons', label: 'Top 8 Weapons' },
    { href: '/compare', label: 'Comparisons' },
    { href: '/battles', label: 'Battle Hubs' },
    { href: '/country', label: 'Country + Class' },
    { href: '/assets', label: 'Resources' },
  ];

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
          <section className="mt-10 rounded-xl border border-gray-800 bg-gray-900/40 p-4 sm:p-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Explore More</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
                    pathname.startsWith(link.href)
                      ? 'border-military-gold/60 bg-military-gold/10 text-military-gold'
                      : 'border-gray-700 text-gray-400 hover:text-white',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
