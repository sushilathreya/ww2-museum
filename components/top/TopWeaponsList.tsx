'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TopWeaponEntry } from '@/lib/data/topWeapons';
import {
  CATEGORY_CONFIG,
  COUNTRIES,
  CountryCode,
  ExplosiveSpecs,
  GunSpecs,
  NavalSpecs,
  TankSpecs,
  PlaneSpecs,
  WeaponCategory,
} from '@/lib/types/weapon';
import { assetPath, cn } from '@/lib/utils';

interface TopWeaponsListProps {
  entries: TopWeaponEntry[];
}

type SortMode = 'rank' | 'year';

export function TopWeaponsList({ entries }: TopWeaponsListProps) {
  const [categoryFilter, setCategoryFilter] = useState<WeaponCategory | 'all'>('all');
  const [countryFilter, setCountryFilter] = useState<CountryCode | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('rank');

  const countries = useMemo(() => {
    const list = Array.from(new Set(entries.map((entry) => entry.weapon.country)));
    return list.sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name));
  }, [entries]);

  const filtered = useMemo(() => {
    const scoped = entries.filter((entry) => {
      const categoryMatch = categoryFilter === 'all' || entry.weapon.category === categoryFilter;
      const countryMatch = countryFilter === 'all' || entry.weapon.country === countryFilter;
      return categoryMatch && countryMatch;
    });

    if (sortMode === 'year') {
      return [...scoped].sort((a, b) => a.weapon.yearIntroduced - b.weapon.yearIntroduced);
    }

    return [...scoped].sort((a, b) => a.rank - b.rank);
  }, [entries, categoryFilter, countryFilter, sortMode]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Editorial Ranking</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Top 8 WW2 Weapons</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Best World War 2 weapons ranked by battlefield impact, production scale, and strategic influence.
          Filter the shortlist by class and nation, then open full detail records from each rank.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/timeline" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
            WW2 Timeline
          </Link>
          <Link href="/compare" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
            Compare Weapons
          </Link>
          <Link href="/battles" className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-military-gold">
            Battle Hubs
          </Link>
        </div>
      </header>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Class Filter</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={chipClass(categoryFilter === 'all')}
            >
              All
            </button>
            {(Object.keys(CATEGORY_CONFIG) as WeaponCategory[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={chipClass(categoryFilter === category)}
              >
                {CATEGORY_CONFIG[category].label}
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Country Filter</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setCountryFilter('all')} className={chipClass(countryFilter === 'all')}>
              All
            </button>
            {countries.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setCountryFilter(country)}
                className={chipClass(countryFilter === country)}
              >
                {COUNTRIES[country].flag} {COUNTRIES[country].name}
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-gray-800 bg-gray-900/60 p-4">
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Sort Mode</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSortMode('rank')}
              className={chipClass(sortMode === 'rank')}
            >
              Rank
            </button>
            <button
              type="button"
              onClick={() => setSortMode('year')}
              className={chipClass(sortMode === 'year')}
            >
              Year Introduced
            </button>
          </div>
          <p className="mt-3 text-xs font-mono uppercase tracking-wider text-gray-500">
            Showing {filtered.length} of {entries.length}
          </p>
        </article>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-10 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.16em] text-gray-500">No records match the current filters.</p>
        </div>
      ) : (
        <ol className="grid gap-4 md:grid-cols-2">
          {filtered.map((entry) => (
            <li key={entry.weapon.id}>
              <Link
                href={`/${entry.weapon.category}/${entry.weapon.slug}`}
                className="group rounded-xl border border-gray-800 bg-gray-900/60 p-4 transition-colors hover:border-military-gold/60"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded border border-gray-800 bg-black/40 sm:h-28 sm:w-40">
                    <Image
                      src={assetPath(entry.weapon.imageUrl)}
                      alt={entry.weapon.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 160px, 220px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-military-gold/50 bg-military-gold/10 px-2 py-0.5 text-xs font-mono text-military-gold">
                        #{entry.rank}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                        {entry.weapon.yearIntroduced}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-3xl text-white">{entry.weapon.name}</h2>
                    <p className="mt-1 text-xs font-mono uppercase tracking-wide text-gray-500">
                      {COUNTRIES[entry.weapon.country].flag} {COUNTRIES[entry.weapon.country].name} •{' '}
                      {CATEGORY_CONFIG[entry.weapon.category].label}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">{entry.rationale}</p>
                    <p className="mt-2 text-xs text-gray-400">{buildSpecLine(entry.weapon.category, entry.weapon.specs)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function chipClass(active: boolean) {
  return cn(
    'rounded border px-3 py-1.5 text-xs font-mono uppercase transition-colors',
    active
      ? 'border-military-gold/60 bg-military-gold/15 text-military-gold'
      : 'border-gray-700 text-gray-400 hover:text-white',
  );
}

function buildSpecLine(category: WeaponCategory, specs: TopWeaponEntry['weapon']['specs']) {
  switch (category) {
    case 'guns': {
      const gun = specs as GunSpecs;
      return `${gun.caliber} | ${gun.action} | effective range ${gun.effectiveRange} m`;
    }
    case 'tanks': {
      const tank = specs as TankSpecs;
      return `${tank.mainArmament} | top speed ${tank.maxSpeed} km/h | ${tank.productionCount.toLocaleString()} built`;
    }
    case 'planes': {
      const plane = specs as PlaneSpecs;
      return `${plane.engine} | top speed ${plane.maxSpeed} km/h | range ${plane.range} km`;
    }
    case 'naval': {
      const naval = specs as NavalSpecs;
      return `${naval.displacement.toLocaleString()} tons | ${naval.speed} knots | crew ${naval.crew.toLocaleString()}`;
    }
    case 'explosives': {
      const explosive = specs as ExplosiveSpecs;
      return `${explosive.explosiveType} | ${explosive.fuzing} | ${explosive.weight} kg`;
    }
    default:
      return '';
  }
}
