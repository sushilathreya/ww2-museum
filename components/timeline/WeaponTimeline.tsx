'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORY_CONFIG, COUNTRIES, CountryCode, Weapon, WeaponCategory } from '@/lib/types/weapon';
import { assetPath, cn } from '@/lib/utils';

interface WeaponTimelineProps {
  weapons: Weapon[];
}

const categoryOrder: WeaponCategory[] = ['guns', 'tanks', 'planes', 'naval', 'explosives'];
const countryOrder: CountryCode[] = ['US', 'DE', 'UK', 'USSR', 'JP', 'IT', 'FR'];

export function WeaponTimeline({ weapons }: WeaponTimelineProps) {
  const years = useMemo(
    () =>
      Array.from(new Set(weapons.map((weapon) => weapon.yearIntroduced)))
        .sort((a, b) => a - b),
    [weapons],
  );

  const minYear = years[0] ?? 1939;
  const maxYear = years[years.length - 1] ?? 1945;
  const defaultYear = years.includes(1939) ? 1939 : minYear;

  const [currentYear, setCurrentYear] = useState(defaultYear);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<WeaponCategory[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setCurrentYear((previous) => (previous >= maxYear ? minYear : previous + 1));
    }, 1300);

    return () => window.clearInterval(timer);
  }, [isPlaying, minYear, maxYear]);

  const filteredWeapons = useMemo(() => {
    return weapons.filter((weapon) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(weapon.category);
      const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(weapon.country);
      return categoryMatch && countryMatch;
    });
  }, [weapons, selectedCategories, selectedCountries]);

  const introducedThisYear = useMemo(
    () => filteredWeapons.filter((weapon) => weapon.yearIntroduced === currentYear),
    [filteredWeapons, currentYear],
  );

  const activeInYear = useMemo(
    () =>
      filteredWeapons.filter(
        (weapon) =>
          weapon.yearIntroduced <= currentYear &&
          (weapon.yearRetired === undefined || weapon.yearRetired >= currentYear),
      ),
    [filteredWeapons, currentYear],
  );

  const yearlyCounts = useMemo(() => {
    const counts = new Map<number, number>();
    for (let year = minYear; year <= maxYear; year += 1) counts.set(year, 0);
    for (const weapon of filteredWeapons) {
      counts.set(weapon.yearIntroduced, (counts.get(weapon.yearIntroduced) ?? 0) + 1);
    }

    return Array.from(counts.entries()).map(([year, count]) => ({ year, count }));
  }, [filteredWeapons, minYear, maxYear]);

  const maxCount = Math.max(...yearlyCounts.map((entry) => entry.count), 1);

  function toggleCategory(category: WeaponCategory) {
    setSelectedCategories((previous) =>
      previous.includes(category) ? previous.filter((item) => item !== category) : [...previous, category],
    );
  }

  function toggleCountry(country: CountryCode) {
    setSelectedCountries((previous) =>
      previous.includes(country) ? previous.filter((item) => item !== country) : [...previous, country],
    );
  }

  return (
    <div className="max-w-6xl">
      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-5 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Interactive Timeline</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">WW2 Weapon Timeline</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Scrub year-by-year to track when major systems entered service, compare production eras, and jump directly
          into primary records.
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((previous) => !previous)}
            className="min-w-24 rounded border border-gray-700 px-3 py-2 text-xs font-mono uppercase tracking-wide text-gray-200 transition-colors hover:border-military-gold hover:text-military-gold"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={() => setCurrentYear(defaultYear)}
            className="rounded border border-gray-700 px-3 py-2 text-xs font-mono uppercase tracking-wide text-gray-300 transition-colors hover:border-military-gold hover:text-military-gold"
          >
            Reset
          </button>
          <p className="ml-auto text-xs font-mono uppercase tracking-[0.14em] text-gray-500">
            Focus Year: <span className="text-military-gold">{currentYear}</span>
          </p>
        </div>

        <div className="mt-5">
          <input
            type="range"
            min={minYear}
            max={maxYear}
            step={1}
            value={currentYear}
            onChange={(event) => {
              setIsPlaying(false);
              setCurrentYear(Number(event.target.value));
            }}
            className="w-full accent-military-gold"
            aria-label="Timeline year selector"
          />
          <div className="mt-3 flex justify-between text-[10px] font-mono text-gray-500">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Category Filter</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategories([])}
              className={cn(
                'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
                selectedCategories.length === 0
                  ? 'border-military-gold/60 bg-military-gold/15 text-military-gold'
                  : 'border-gray-700 text-gray-400 hover:text-white',
              )}
            >
              All
            </button>
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={cn(
                  'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
                  selectedCategories.includes(category)
                    ? 'border-military-gold/60 bg-military-gold/15 text-military-gold'
                    : 'border-gray-700 text-gray-400 hover:text-white',
                )}
              >
                {CATEGORY_CONFIG[category].label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Country Filter</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCountries([])}
              className={cn(
                'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
                selectedCountries.length === 0
                  ? 'border-military-gold/60 bg-military-gold/15 text-military-gold'
                  : 'border-gray-700 text-gray-400 hover:text-white',
              )}
            >
              All
            </button>
            {countryOrder.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => toggleCountry(country)}
                className={cn(
                  'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
                  selectedCountries.includes(country)
                    ? 'border-military-gold/60 bg-military-gold/15 text-military-gold'
                    : 'border-gray-700 text-gray-400 hover:text-white',
                )}
              >
                {COUNTRIES[country].flag} {COUNTRIES[country].name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-xl border border-gray-800 bg-gray-950/50 p-4 sm:p-5">
        <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Introduction Tempo</p>
        <div className="flex items-end gap-1 overflow-x-auto pb-1">
          {yearlyCounts.map((entry) => {
            const height = Math.max(8, Math.round((entry.count / maxCount) * 92));
            const isActive = entry.year === currentYear;
            return (
              <button
                key={entry.year}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentYear(entry.year);
                }}
                className="group flex w-7 shrink-0 flex-col items-center gap-1"
                aria-label={`Set timeline to ${entry.year}`}
              >
                <span
                  className={cn(
                    'w-4 rounded-t transition-all',
                    isActive ? 'bg-military-gold shadow-[0_0_14px_rgba(201,162,39,0.35)]' : 'bg-gray-600/70 group-hover:bg-gray-400',
                  )}
                  style={{ height }}
                />
                <span className={cn('text-[10px] font-mono', isActive ? 'text-military-gold' : 'text-gray-500')}>
                  {String(entry.year).slice(-2)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Year Snapshot</p>
          <p className="mt-3 text-sm text-gray-300">
            <span className="text-white font-mono">{introducedThisYear.length}</span> weapons introduced in{' '}
            <span className="text-military-gold font-mono">{currentYear}</span>.
          </p>
          <p className="mt-2 text-sm text-gray-300">
            <span className="text-white font-mono">{activeInYear.length}</span> active records in this filtered view.
          </p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Navigation</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/compare" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
              Compare Systems
            </Link>
            <Link href="/battles" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
              Battle Hubs
            </Link>
            <Link href="/country" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
              Country + Class
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-5">
        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">
          Introduced In {currentYear}
        </p>

        {introducedThisYear.length === 0 ? (
          <p className="text-sm text-gray-500">No weapon introductions for this year with current filters.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {introducedThisYear.map((weapon) => (
              <Link
                key={weapon.id}
                href={`/${weapon.category}/${weapon.slug}`}
                className="rounded-lg border border-gray-800 bg-black/35 p-3 transition-colors hover:border-military-gold/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded bg-black/50">
                  <Image
                    src={assetPath(weapon.imageUrl)}
                    alt={weapon.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1280px) 50vw, 360px"
                  />
                </div>
                <p className="mt-3 font-display text-2xl text-white">{weapon.name}</p>
                <p className="mt-1 text-xs font-mono uppercase text-gray-500">
                  {COUNTRIES[weapon.country].name} • {CATEGORY_CONFIG[weapon.category].label}
                </p>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">{weapon.history.overview}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
