import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFeaturedWeapons, getWeaponsByCategory } from '@/lib/data/weapons';
import { CATEGORY_CONFIG, WeaponCategory } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata, buildWebSiteJsonLd } from '@/lib/seo';

const categoryOrder: WeaponCategory[] = ['guns', 'tanks', 'planes', 'naval', 'explosives'];

export const metadata = buildPageMetadata({
  title: 'Weapons of World War 2 - World War II Weapons Repository',
  description:
    'Explore an interactive catalog of World War II guns, tanks, aircraft, naval vessels, and explosives with specifications and battlefield history.',
  path: '/',
});

export default function HomePage() {
  const featuredWeapons = getFeaturedWeapons().slice(0, 8);
  const categorySummaries = categoryOrder.map((category) => {
    const records = getWeaponsByCategory(category);

    return {
      category,
      label: CATEGORY_CONFIG[category].label,
      count: records.length,
      sample: records.slice(0, 3).map((weapon) => weapon.name),
    };
  });
  const totalRecords = categorySummaries.reduce((sum, entry) => sum + entry.count, 0);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'World War II Weapon Categories',
    url: absoluteUrl('/'),
    numberOfItems: categorySummaries.length,
    itemListElement: categorySummaries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.label,
      url: absoluteUrl(`/${entry.category}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={buildWebSiteJsonLd()} />
      <JsonLd data={collectionSchema} />

      <header className="mb-12 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-military-gold">World War Weapons</p>
        <h1 className="font-display text-4xl text-white sm:text-5xl md:text-6xl stencil-text">
          World War II Weapons Archive
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
          Research the machines and munitions that shaped the Second World War. Browse weapons by category,
          compare platform roles, and drill into technical specifications and combat history across {totalRecords}{' '}
          records.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {categorySummaries.map((entry) => (
            <Link
              key={entry.category}
              href={`/${entry.category}`}
              className="rounded border border-gray-700 px-3 py-2 text-xs font-mono uppercase tracking-wide text-gray-200 transition-colors hover:border-military-gold hover:text-military-gold"
            >
              {entry.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl text-military-gold stencil-text">Browse Categories</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categorySummaries.map((entry) => (
            <Link
              key={entry.category}
              href={`/${entry.category}`}
              className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
            >
              <p className="font-display text-2xl text-white stencil-text">{entry.label}</p>
              <p className="mt-2 text-sm text-gray-400">{entry.count} indexed records</p>
              <p className="mt-3 text-xs text-gray-500">
                {entry.sample.join(' • ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl text-military-gold stencil-text">Featured Weapons</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWeapons.map((weapon) => (
            <Link
              key={weapon.id}
              href={`/${weapon.category}/${weapon.slug}`}
              className="rounded border border-gray-800 bg-black/40 px-4 py-3 transition-colors hover:border-military-gold/50"
            >
              <p className="font-display text-lg text-white">{weapon.name}</p>
              <p className="mt-1 text-[11px] font-mono uppercase text-gray-500">
                {weapon.category} • {weapon.yearIntroduced}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
