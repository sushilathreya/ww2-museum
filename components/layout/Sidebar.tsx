'use client';

import { type ElementType } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Airplane, Anchor, Bomb, Crosshair, Shield } from '@phosphor-icons/react';
import { CATEGORY_CONFIG, WeaponCategory } from '@/lib/types/weapon';

const categoryIcons: Record<WeaponCategory, ElementType> = {
  guns: Crosshair,
  tanks: Shield,
  planes: Airplane,
  naval: Anchor,
  explosives: Bomb,
};

const TOTAL_RECORDS = 79;

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSub = searchParams.get('sub');

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 w-64 bg-military-black border-r border-gray-800
        h-screen overflow-y-auto flex flex-col
        transition-transform duration-300 ease-in-out
        lg:sticky lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo + Close button */}
      <div className="flex items-center justify-between border-b border-gray-800">
        <Link
          href="/"
          className="block flex-1 p-6 hover:bg-gray-900 transition-colors"
          onClick={onClose}
        >
          <h1 className="font-display text-2xl text-military-gold tracking-wider stencil-text">
            WW2 ARSENAL
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-1">
            WEAPONS REPOSITORY
          </p>
        </Link>
        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-4 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>

      {/* Categories */}
      <nav className="p-4 flex-1">
        {(Object.keys(CATEGORY_CONFIG) as WeaponCategory[]).map((categoryKey) => {
          const category = CATEGORY_CONFIG[categoryKey];
          const isActive = pathname.startsWith(`/${categoryKey}`);
          const CategoryIcon = categoryIcons[categoryKey];

          return (
            <div key={categoryKey} className="mb-4">
              {/* Category Header */}
              <Link
                href={`/${categoryKey}`}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-military-gold/15 text-military-gold border border-military-gold/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <CategoryIcon size={18} weight={isActive ? 'fill' : 'regular'} className="shrink-0" />
                <span className="font-display text-lg tracking-wide">
                  {category.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-military-gold rounded-full animate-pulse-gold" />
                )}
              </Link>

              {/* Subcategories */}
              {isActive && (
                <div className="ml-9 mt-2 space-y-0.5 border-l border-gray-700/50 pl-4">
                  <Link
                    href={`/${categoryKey}`}
                    onClick={onClose}
                    className={`
                      block px-3 py-1.5 text-sm rounded transition-colors
                      ${
                        pathname === `/${categoryKey}` && !activeSub
                          ? 'text-military-gold bg-military-gold/10'
                          : 'text-gray-500 hover:text-gray-300'
                      }
                    `}
                  >
                    All {category.label.toLowerCase()}
                  </Link>
                  {category.subcategories.map((sub) => {
                    const isSubActive = pathname === `/${categoryKey}` && activeSub === sub.slug;
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${categoryKey}?sub=${sub.slug}`}
                        onClick={onClose}
                        className={`
                          block px-3 py-1.5 text-sm rounded transition-colors
                          ${
                            isSubActive
                              ? 'text-military-gold bg-military-gold/10'
                              : 'text-gray-500 hover:text-gray-300'
                          }
                        `}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-600 font-mono">
          <p>TOTAL RECORDS: {TOTAL_RECORDS}</p>
          <p>WWII: 1939-1945</p>
        </div>
      </div>
    </aside>
  );
}
