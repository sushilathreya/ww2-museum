import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getComparisonBySlug, getComparisonClusters } from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';
import { buildComparisonSpecRows } from '@/lib/specRows';
import { assetPath } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getComparisonClusters().map((comparison) => ({ slug: comparison.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return { title: 'Not Found' };

  return buildPageMetadata({
    title: `${comparison.title} - WW2 Comparison`,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    image: comparison.left.imageUrl,
  });
}

export default function CompareDetailPage({ params }: PageProps) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: comparison.title,
    description: comparison.description,
    url: absoluteUrl(`/compare/${comparison.slug}`),
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: comparison.left.name,
        url: absoluteUrl(`/${comparison.left.category}/${comparison.left.slug}`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: comparison.right.name,
        url: absoluteUrl(`/${comparison.right.category}/${comparison.right.slug}`),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-4" />

      <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-military-gold">
        <span>&larr;</span>
        <span>BACK TO COMPARISONS</span>
      </Link>

      <header className="mt-4 mb-8 rounded-xl border border-gray-800 bg-gray-950/70 p-6 sm:p-8">
        <h1 className="font-display text-4xl text-white sm:text-5xl stencil-text">{comparison.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">{comparison.description}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {[comparison.left, comparison.right].map((weapon) => (
          <article key={weapon.id} className="rounded-lg border border-gray-800 bg-gray-900/60 p-5">
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded bg-black/40">
              <Image
                src={assetPath(weapon.imageUrl)}
                alt={weapon.name}
                fill
                className="object-contain p-2 sm:p-3"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <p className="text-xs font-mono uppercase text-gray-500">
              {COUNTRIES[weapon.country].name} • {CATEGORY_CONFIG[weapon.category].label}
            </p>
            <h2 className="mt-2 font-display text-3xl text-white">{weapon.name}</h2>
            <p className="mt-1 text-sm text-gray-400">{weapon.designation}</p>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{weapon.history.overview}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <dt className="text-gray-500">Introduced</dt>
                <dd className="text-gray-200">{weapon.yearIntroduced}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Manufacturer</dt>
                <dd className="text-gray-200">{weapon.manufacturer}</dd>
              </div>
              {weapon.yearRetired && (
                <div>
                  <dt className="text-gray-500">Retired</dt>
                  <dd className="text-gray-200">{weapon.yearRetired}</dd>
                </div>
              )}
              <div>
                <dt className="text-gray-500">Type</dt>
                <dd className="text-gray-200">{weapon.subcategory.replace('-', ' ')}</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-gray-800 pt-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-military-gold mb-2">
                Key Technical Details
              </h3>
              <dl className="grid grid-cols-1 gap-2 text-xs font-mono">
                {buildComparisonSpecRows(weapon).map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 rounded border border-gray-800 bg-black/30 px-2.5 py-2">
                    <dt className="text-gray-500 uppercase">{label}</dt>
                    <dd className="text-gray-200 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 border-t border-gray-800 pt-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-military-gold mb-2">
                Combat Context
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">{weapon.history.combatHistory}</p>
              <ul className="mt-3 space-y-1">
                {weapon.history.notableUses.slice(0, 3).map((entry) => (
                  <li key={entry} className="text-xs text-gray-400">
                    • {entry}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/${weapon.category}/${weapon.slug}`}
              className="mt-4 inline-flex text-sm font-mono text-military-gold hover:text-white"
            >
              OPEN FULL RECORD &rarr;
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
