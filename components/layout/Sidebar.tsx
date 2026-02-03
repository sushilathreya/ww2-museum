'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORY_CONFIG, WeaponCategory } from '@/lib/types/weapon';

const categoryIcons: Record<WeaponCategory, string> = {
  guns: '🔫',
  tanks: '🪖',
  planes: '✈️',
  naval: '⚓',
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-military-black border-r border-gray-800 h-screen sticky top-0 overflow-y-auto flex flex-col">
      {/* Logo */}
      <Link href="/" className="block p-6 border-b border-gray-800 hover:bg-gray-900 transition-colors">
        <h1 className="font-display text-2xl text-military-gold tracking-wider stencil-text">
          WW2 ARSENAL
        </h1>
        <p className="text-xs text-gray-500 font-mono mt-1">
          WEAPONS REPOSITORY
        </p>
      </Link>

      {/* Categories */}
      <nav className="p-4 flex-1">
        {(Object.keys(CATEGORY_CONFIG) as WeaponCategory[]).map((categoryKey) => {
          const category = CATEGORY_CONFIG[categoryKey];
          const isActive = pathname.startsWith(`/${categoryKey}`);

          return (
            <div key={categoryKey} className="mb-4">
              {/* Category Header */}
              <Link
                href={`/${categoryKey}`}
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
                <span className="text-lg">{categoryIcons[categoryKey]}</span>
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
                    className={`
                      block px-3 py-1.5 text-sm rounded transition-colors
                      ${
                        pathname === `/${categoryKey}`
                          ? 'text-military-gold bg-military-gold/10'
                          : 'text-gray-500 hover:text-gray-300'
                      }
                    `}
                  >
                    All {category.label.toLowerCase()}
                  </Link>
                  {category.subcategories.map((sub) => {
                    const isSubActive = pathname === `/${categoryKey}/${sub.slug}`;
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${categoryKey}?sub=${sub.slug}`}
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
          <p>TOTAL RECORDS: 15</p>
          <p>WWII: 1939-1945</p>
        </div>
      </div>
    </aside>
  );
}
