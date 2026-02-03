'use client';

import { useState, useMemo } from 'react';
import { Weapon, WeaponSubcategory, CountryCode, COUNTRIES, CATEGORY_CONFIG, WeaponCategory } from '@/lib/types/weapon';
import { WeaponCard } from './WeaponCard';
import { cn } from '@/lib/utils';

interface WeaponGridProps {
  weapons: Weapon[];
  category?: WeaponCategory;
  title: string;
  subtitle?: string;
}

export function WeaponGrid({ weapons, category, title, subtitle }: WeaponGridProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null);
  const [selectedSub, setSelectedSub] = useState<WeaponSubcategory | null>(null);

  // Get unique countries from weapons
  const availableCountries = useMemo(() => {
    const countries = new Set(weapons.map((w) => w.country));
    return Array.from(countries);
  }, [weapons]);

  // Get subcategories if we have a category
  const subcategories = category ? CATEGORY_CONFIG[category].subcategories : [];

  const filteredWeapons = useMemo(() => {
    return weapons.filter((w) => {
      if (selectedCountry && w.country !== selectedCountry) return false;
      if (selectedSub && w.subcategory !== selectedSub) return false;
      return true;
    });
  }, [weapons, selectedCountry, selectedSub]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white tracking-wider stencil-text">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 font-mono text-sm mt-2">{subtitle}</p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-800">
        {/* Subcategory Filter */}
        {subcategories.length > 0 && (
          <div>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSub(null)}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono rounded border transition-colors',
                  !selectedSub
                    ? 'bg-military-gold/20 border-military-gold/50 text-military-gold'
                    : 'border-gray-700 text-gray-500 hover:text-white hover:border-gray-500',
                )}
              >
                ALL
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSub(selectedSub === sub.slug ? null : sub.slug)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-mono rounded border transition-colors uppercase',
                    selectedSub === sub.slug
                      ? 'bg-military-gold/20 border-military-gold/50 text-military-gold'
                      : 'border-gray-700 text-gray-500 hover:text-white hover:border-gray-500',
                  )}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Country Filter */}
        <div>
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">
            Country
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry(null)}
              className={cn(
                'px-3 py-1.5 text-xs font-mono rounded border transition-colors',
                !selectedCountry
                  ? 'bg-military-gold/20 border-military-gold/50 text-military-gold'
                  : 'border-gray-700 text-gray-500 hover:text-white hover:border-gray-500',
              )}
            >
              ALL
            </button>
            {availableCountries.map((code) => (
              <button
                key={code}
                onClick={() =>
                  setSelectedCountry(selectedCountry === code ? null : code)
                }
                className={cn(
                  'px-3 py-1.5 text-xs rounded border transition-colors',
                  selectedCountry === code
                    ? 'bg-military-gold/20 border-military-gold/50 text-military-gold'
                    : 'border-gray-700 text-gray-500 hover:text-white hover:border-gray-500',
                )}
              >
                {COUNTRIES[code].flag} {COUNTRIES[code].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-mono text-gray-600 mb-4">
        SHOWING {filteredWeapons.length} OF {weapons.length} RECORDS
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWeapons.map((weapon) => (
          <WeaponCard key={weapon.id} weapon={weapon} />
        ))}
      </div>

      {filteredWeapons.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 font-mono">NO WEAPONS FOUND</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
