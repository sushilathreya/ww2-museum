import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBattleClusters, getWeaponsForBattle } from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

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

      <Link href="/battles" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-military-gold">
        <span>&larr;</span>
        <span>BACK TO BATTLES</span>
      </Link>

      <header className="mt-4 mb-8 rounded-xl border border-gray-800 bg-gray-950/70 p-6 sm:p-8">
        <h1 className="font-display text-4xl text-white sm:text-5xl stencil-text">{cluster.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">{cluster.description}</p>
      </header>

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
