import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBattleClusters, getWeaponsForBattle } from '@/lib/data/phase2';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'WW2 Battle Weapon Clusters - World War Weapons',
  description:
    'Battle-focused landing pages linking WW2 weapon records to major campaigns and operational theaters.',
  path: '/battles',
});

export default function BattleIndexPage() {
  const clusters = getBattleClusters()
    .map((cluster) => ({
      ...cluster,
      count: getWeaponsForBattle(cluster.slug).length,
    }))
    .filter((cluster) => cluster.count > 0);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'World War II Battle Weapon Clusters',
    url: absoluteUrl('/battles'),
    numberOfItems: clusters.length,
    itemListElement: clusters.map((cluster, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cluster.title,
      url: absoluteUrl(`/battles/${cluster.slug}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={itemListSchema} />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Phase 2 Cluster</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Battle Context Hubs</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Browse weapon records grouped by major WW2 campaigns and theater-defining battles.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {clusters.map((cluster) => (
          <Link
            key={cluster.slug}
            href={`/battles/${cluster.slug}`}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="font-display text-2xl text-white">{cluster.title}</p>
            <p className="mt-2 text-sm text-gray-400">{cluster.count} linked records</p>
            <p className="mt-3 text-sm text-gray-300">{cluster.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
