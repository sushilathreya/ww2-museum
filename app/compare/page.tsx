import Link from 'next/link';
import Image from 'next/image';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getComparisonClusters } from '@/lib/data/phase2';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';
import { assetPath } from '@/lib/utils';

export const metadata = buildPageMetadata({
  title: 'WW2 Weapon Comparisons - World War Weapons',
  description:
    'Compare major World War II weapon systems by doctrine, production context, and battlefield role.',
  path: '/compare',
});

export default function CompareIndexPage() {
  const comparisons = getComparisonClusters();
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'World War II Weapon Comparison Pages',
    url: absoluteUrl('/compare'),
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((comparison, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: comparison.title,
      url: absoluteUrl(`/compare/${comparison.slug}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={itemListSchema} />
      <ResearchHomeLogo className="mb-5" />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Phase 2 Cluster</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Weapon Comparisons</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Comparative briefings focused on operational tradeoffs, industrial realities, and combat outcomes.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/compare/${comparison.slug}`}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="font-display text-2xl text-white">{comparison.title}</p>
            <p className="mt-2 text-sm text-gray-400">
              {comparison.left.name} vs {comparison.right.name}
            </p>
            <p className="mt-3 text-sm text-gray-300">{comparison.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[comparison.left, comparison.right].map((weapon) => (
                <div key={weapon.id} className="rounded border border-gray-800 bg-black/40 p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded bg-gray-950">
                    <Image
                      src={assetPath(weapon.imageUrl)}
                      alt={weapon.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                  <p className="mt-2 font-display text-xl text-white">{weapon.name}</p>
                  <p className="text-xs font-mono uppercase text-gray-500">
                    {weapon.subcategory.replace('-', ' ')} • {weapon.yearIntroduced}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{weapon.manufacturer}</p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
