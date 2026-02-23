import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'WW2 Linkable Assets - World War Weapons',
  description:
    'Reference-ready WW2 assets: interactive timeline, printable weapon comparison sheets, and battle loadout maps by theater and year.',
  path: '/assets',
});

const assets = [
  {
    slug: 'timeline',
    href: '/timeline',
    title: 'Interactive WW2 Timeline',
    label: 'Interactive Reference',
    description:
      'Year-by-year weapon introductions with filters for category and country, ready for newsletter embeds and citations.',
  },
  {
    slug: 'comparison-sheets',
    href: '/assets/comparison-sheets',
    title: 'Printable Comparison Sheets',
    label: 'PDF-Friendly Asset',
    description:
      'One-click printable sheets for major WW2 matchups with concise technical and doctrinal side-by-side summaries.',
  },
  {
    slug: 'battle-loadout-maps',
    href: '/assets/battle-loadout-maps',
    title: 'Battle Loadout Maps',
    label: 'Theater and Year Maps',
    description:
      'Operational loadout maps organized by theater and campaign year, linking directly to underlying weapon records.',
  },
];

export default function AssetsHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'WW2 Linkable Assets',
    url: absoluteUrl('/assets'),
    numberOfItems: assets.length,
    itemListElement: assets.map((asset, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: asset.title,
      url: absoluteUrl(asset.href),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-5" />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Phase 3 Assets</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Linkable Asset Library</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Built for citation, classroom references, and history-community sharing. Each asset links back into primary
          weapon records for deeper research.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {assets.map((asset) => (
          <Link
            key={asset.slug}
            href={asset.href}
            className="rounded-lg border border-gray-800 bg-gray-900/55 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">{asset.label}</p>
            <h2 className="mt-2 font-display text-3xl text-white">{asset.title}</h2>
            <p className="mt-3 text-sm text-gray-300">{asset.description}</p>
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.14em] text-gray-500">Open asset &rarr;</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
