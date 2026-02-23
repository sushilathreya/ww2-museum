import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getBattleClusters, getWeaponsForBattle } from '@/lib/data/phase2';
import { getBattleLoadoutMaps } from '@/lib/data/phase3';
import { CATEGORY_CONFIG, COUNTRIES } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';
import { assetPath } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getBattleClusters()
    .filter((cluster) => getWeaponsForBattle(cluster.slug).length > 0)
    .map((cluster) => ({ slug: cluster.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const cluster = getBattleClusters().find((entry) => entry.slug === params.slug);
  if (!cluster) return { title: 'Not Found' };

  return buildPageMetadata({
    title: `${cluster.title} Weapons - World War Weapons`,
    description: cluster.description,
    path: `/battles/${cluster.slug}`,
  });
}

export default function BattleDetailPage({ params }: PageProps) {
  const cluster = getBattleClusters().find((entry) => entry.slug === params.slug);
  if (!cluster) {
    notFound();
  }

  const linkedWeapons = getWeaponsForBattle(cluster.slug);
  const loadoutMap = getBattleLoadoutMaps().find((entry) => entry.slug === cluster.slug);
  if (linkedWeapons.length === 0) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cluster.title} Weapon Records`,
    url: absoluteUrl(`/battles/${cluster.slug}`),
    numberOfItems: linkedWeapons.length,
    itemListElement: linkedWeapons.map((weapon, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: weapon.name,
      url: absoluteUrl(`/${weapon.category}/${weapon.slug}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-4" />

      <Link href="/battles" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-military-gold">
        <span>&larr;</span>
        <span>BACK TO BATTLES</span>
      </Link>

      <header className="mt-4 mb-8 rounded-xl border border-gray-800 bg-gray-950/70 p-6 sm:p-8">
        <h1 className="font-display text-4xl text-white sm:text-5xl stencil-text">{cluster.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">{cluster.description}</p>
        {loadoutMap && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded border border-gray-700 bg-black/40 px-2.5 py-1 text-xs font-mono uppercase tracking-[0.12em] text-gray-300">
              {loadoutMap.theater}
            </span>
            <span className="rounded border border-gray-700 bg-black/40 px-2.5 py-1 text-xs font-mono uppercase tracking-[0.12em] text-gray-300">
              {loadoutMap.year}
            </span>
            <Link
              href={`/assets/battle-loadout-maps?map=${loadoutMap.slug}`}
              className="rounded border border-military-gold/60 bg-military-gold/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.12em] text-military-gold transition-colors hover:bg-military-gold/20"
            >
              Open Interactive Map View
            </Link>
          </div>
        )}
      </header>

      {loadoutMap && (
        <>
          <section className="mb-8 rounded-xl border border-gray-800 bg-gray-900/55 p-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Battle Map Context</p>
            <p className="mt-3 text-sm text-gray-300">{loadoutMap.summary}</p>
            <Link
              href={`/assets/battle-loadout-maps?map=${loadoutMap.slug}`}
              className="mt-4 block w-full cursor-zoom-in rounded-lg border border-gray-800 bg-black/30 transition-colors hover:border-military-gold/40"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={assetPath(loadoutMap.mapImageUrl)}
                  alt={loadoutMap.mapAlt}
                  fill
                  className="object-contain p-2 sm:p-4"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-2 right-3 text-[10px] font-mono text-gray-300 sm:text-xs">
                  OPEN INTERACTIVE MAP
                </p>
              </div>
            </Link>
            <p className="mt-2 text-xs text-gray-500">
              Map source:{' '}
              <Link
                href={loadoutMap.mapSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-military-gold transition-colors hover:text-white"
              >
                {loadoutMap.mapSourceLabel}
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {loadoutMap.categoryCounts.map((entry) => (
                <span
                  key={entry.category}
                  className="rounded border border-gray-700 bg-black/45 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.12em] text-gray-300"
                >
                  {entry.label}: {entry.count}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 font-display text-3xl text-white">Operational Loadout Lanes</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {loadoutMap.lanes.map((lane) => (
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
                  <ul className="mt-4 space-y-2">
                    {lane.weapons.map((weapon) => (
                      <li key={`${lane.id}-${weapon.slug}`}>
                        <Link
                          href={`/${weapon.category}/${weapon.slug}`}
                          className="text-sm text-gray-300 transition-colors hover:text-military-gold"
                        >
                          {weapon.name}
                        </Link>
                        <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500">
                          {weapon.countryFlag} {weapon.countryName} • {weapon.yearIntroduced}
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      <h2 className="mb-4 font-display text-3xl text-white">Linked Weapon Records</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {linkedWeapons.map((weapon) => (
          <Link
            key={weapon.id}
            href={`/${weapon.category}/${weapon.slug}`}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="text-xs font-mono uppercase text-gray-500">
              {COUNTRIES[weapon.country].name} • {CATEGORY_CONFIG[weapon.category].label}
            </p>
            <p className="mt-2 font-display text-2xl text-white">{weapon.name}</p>
            <p className="mt-2 text-sm text-gray-300 line-clamp-3">{weapon.history.overview}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
