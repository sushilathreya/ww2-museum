'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BattleLoadoutMap } from '@/lib/data/phase3';
import { CATEGORY_CONFIG } from '@/lib/types/weapon';
import { assetPath, cn } from '@/lib/utils';

interface BattleLoadoutExplorerProps {
  maps: BattleLoadoutMap[];
}

export function BattleLoadoutExplorer({ maps }: BattleLoadoutExplorerProps) {
  const theaters = useMemo(() => Array.from(new Set(maps.map((entry) => entry.theater))), [maps]);
  const years = useMemo(() => Array.from(new Set(maps.map((entry) => entry.year))).sort((a, b) => a - b), [maps]);

  const [theaterFilter, setTheaterFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [activeSlug, setActiveSlug] = useState(maps[0]?.slug ?? '');

  const filteredMaps = useMemo(
    () =>
      maps.filter((entry) => {
        const theaterMatch = theaterFilter === 'all' || entry.theater === theaterFilter;
        const yearMatch = yearFilter === 'all' || entry.year === Number(yearFilter);
        return theaterMatch && yearMatch;
      }),
    [maps, theaterFilter, yearFilter],
  );

  useEffect(() => {
    if (filteredMaps.some((entry) => entry.slug === activeSlug)) return;
    setActiveSlug(filteredMaps[0]?.slug ?? '');
  }, [filteredMaps, activeSlug]);

  const activeMap = filteredMaps.find((entry) => entry.slug === activeSlug) ?? filteredMaps[0];

  if (maps.length === 0 || !activeMap) {
    return (
      <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
        <p className="text-sm text-gray-400">No battle loadout data is currently available.</p>
      </section>
    );
  }

  return (
    <div>
      <section className="mb-6 grid gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Theater Filter</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTheaterFilter('all')}
              className={chipClass(theaterFilter === 'all')}
            >
              All Theaters
            </button>
            {theaters.map((theater) => (
              <button
                key={theater}
                type="button"
                onClick={() => setTheaterFilter(theater)}
                className={chipClass(theaterFilter === theater)}
              >
                {theater}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Year Filter</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setYearFilter('all')} className={chipClass(yearFilter === 'all')}>
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setYearFilter(String(year))}
                className={chipClass(Number(yearFilter) === year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredMaps.map((entry) => (
          <button
            key={entry.slug}
            type="button"
            onClick={() => setActiveSlug(entry.slug)}
            className={cn(
              'text-left rounded-lg border p-4 transition-colors',
              activeMap.slug === entry.slug
                ? 'border-military-gold/60 bg-military-gold/10'
                : 'border-gray-800 bg-gray-900/45 hover:border-gray-700',
            )}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">
              {entry.theater} • {entry.year}
            </p>
            <p className="mt-2 font-display text-2xl text-white">{entry.title}</p>
            <p className="mt-2 text-sm text-gray-300">{entry.description}</p>
          </button>
        ))}
      </section>

      <section className="mb-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">
          Active Map • {activeMap.theater} • {activeMap.year}
        </p>
        <h2 className="mt-2 font-display text-4xl text-white stencil-text">{activeMap.title}</h2>
        <p className="mt-3 max-w-4xl text-sm text-gray-300">{activeMap.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {activeMap.categoryCounts.map((entry) => (
            <span
              key={entry.category}
              className="rounded border border-gray-700 bg-black/45 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-gray-300"
            >
              {entry.label}: {entry.count}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        {activeMap.lanes.map((lane) => (
          <article key={lane.id} className="rounded-xl border border-gray-800 bg-gray-900/55 p-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">{lane.title}</p>
            <p className="mt-2 text-sm text-gray-300">{lane.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lane.categories.map((category) => (
                <span
                  key={category}
                  className="rounded border border-gray-700 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-gray-400"
                >
                  {CATEGORY_CONFIG[category].label}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {lane.weapons.map((weapon) => (
                <Link
                  key={`${lane.id}-${weapon.slug}`}
                  href={`/${weapon.category}/${weapon.slug}`}
                  className="block rounded-lg border border-gray-800 bg-black/35 p-2.5 transition-colors hover:border-military-gold/50"
                >
                  <div className="flex gap-3">
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-black/50">
                      <Image
                        src={assetPath(weapon.imageUrl)}
                        alt={weapon.name}
                        fill
                        className="object-contain p-1"
                        sizes="128px"
                      />
                    </div>
                    <div>
                      <p className="font-display text-xl text-white">{weapon.name}</p>
                      <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500">
                        {weapon.countryFlag} {weapon.countryName} • {weapon.yearIntroduced}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Linked Battle Cluster</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/battles/${activeMap.battleSlug}`}
            className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 transition-colors hover:text-military-gold"
          >
            Open Full Battle Context
          </Link>
          <Link
            href="/timeline"
            className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 transition-colors hover:text-military-gold"
          >
            Timeline Asset
          </Link>
          <Link
            href="/assets/comparison-sheets"
            className="rounded border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 transition-colors hover:text-military-gold"
          >
            Printable Sheets
          </Link>
        </div>
      </section>
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
