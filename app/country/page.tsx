import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { countryCodeToSlug, getCountryCategoryClusters } from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Country and Weapon Class Hubs - World War Weapons',
  description:
    'Browse World War II weapon records grouped by country and category to study doctrine and industrial output.',
  path: '/country',
});

export default function CountryIndexPage() {
  const clusters = getCountryCategoryClusters();
  const grouped = Object.entries(COUNTRIES).map(([code, country]) => {
    const items = clusters
      .filter((cluster) => cluster.country === code)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
    return { code, country, items };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Country and Weapon Class Hubs',
    url: absoluteUrl('/country'),
    numberOfItems: clusters.length,
    itemListElement: clusters.map((cluster, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${COUNTRIES[cluster.country].name} ${CATEGORY_CONFIG[cluster.category].label}`,
      url: absoluteUrl(`/country/${countryCodeToSlug(cluster.country)}/${cluster.category}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-5" />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Country Research Index</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Country + Class Hubs</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Explore how each major combatant fielded guns, armor, aircraft, naval assets, and ordnance.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {grouped.map(({ code, country, items }) => (
          <section key={code} className="rounded-lg border border-gray-800 bg-gray-900/60 p-5">
            <h2 className="font-display text-3xl text-white">
              {country.flag} {country.name}
            </h2>
            <div className="mt-4 space-y-2">
              {items.map((cluster) => (
                <Link
                  key={cluster.category}
                  href={`/country/${countryCodeToSlug(cluster.country)}/${cluster.category}`}
                  className="flex items-center justify-between rounded border border-gray-800 bg-black/40 px-3 py-2 text-sm transition-colors hover:border-military-gold/50"
                >
                  <span className="font-mono text-gray-200">{CATEGORY_CONFIG[cluster.category].label}</span>
                  <span className="text-gray-500">{cluster.count}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
