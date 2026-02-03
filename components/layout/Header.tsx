'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WeaponCategory, CATEGORY_CONFIG } from '@/lib/types/weapon';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-military-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-3">
          {/* Hamburger menu - visible on mobile only */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-gray-400" />
            <span className="block w-5 h-0.5 bg-gray-400" />
            <span className="block w-5 h-0.5 bg-gray-400" />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-mono">
            <Link href="/" className="text-gray-400 hover:text-military-gold transition-colors">
              HOME
            </Link>
            {pathname !== '/' && (
              <>
                <span className="text-gray-600">/</span>
                <span className="text-military-gold uppercase truncate max-w-[200px] sm:max-w-none">
                  {pathname.split('/').filter(Boolean).join(' / ')}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Desktop Nav Links */}
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
