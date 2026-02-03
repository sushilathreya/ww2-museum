'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WeaponCategory, CATEGORY_CONFIG } from '@/lib/types/weapon';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-military-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-mono">
          <Link href="/" className="text-gray-400 hover:text-military-gold transition-colors">
            HOME
          </Link>
          {pathname !== '/' && (
            <>
              <span className="text-gray-600">/</span>
              <span className="text-military-gold uppercase">
                {pathname.split('/').filter(Boolean).join(' / ')}
              </span>
            </>
          )}
        </nav>

        {/* Mobile Nav Links */}
        <nav className="hidden md:flex items-center gap-4">
          {(Object.keys(CATEGORY_CONFIG) as WeaponCategory[]).map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              className={`
                text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded
                transition-colors
                ${
                  pathname.startsWith(`/${key}`)
                    ? 'text-military-gold bg-military-gold/10'
                    : 'text-gray-500 hover:text-white'
                }
              `}
            >
              {CATEGORY_CONFIG[key].label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
