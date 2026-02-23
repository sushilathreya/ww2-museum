import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getComparisonClusters } from '@/lib/data/phase2';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Printable WW2 Comparison Sheets - World War Weapons',
  description:
    'Printable and PDF-ready WW2 weapon comparison sheets with side-by-side technical and doctrinal summaries.',
  path: '/assets/comparison-sheets',
});

export default function ComparisonSheetsIndexPage() {
  const comparisons = getComparisonClusters();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Printable WW2 Comparison Sheets',
    url: absoluteUrl('/assets/comparison-sheets'),
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((comparison, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${comparison.title} printable sheet`,
      url: absoluteUrl(`/assets/comparison-sheets/${comparison.slug}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-5" />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Phase 3 Linkable Asset</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Printable Comparison Sheets</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Open any sheet and use print to export a clean PDF handout for research briefings, newsletters, or classroom
          packets.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/assets/comparison-sheets/${comparison.slug}`}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-military-gold">Printable PDF Sheet</p>
            <h2 className="mt-2 font-display text-3xl text-white">{comparison.title}</h2>
            <p className="mt-2 text-sm text-gray-400">
              {comparison.left.name} vs {comparison.right.name}
            </p>
            <p className="mt-3 text-sm text-gray-300">{comparison.description}</p>
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.14em] text-gray-500">Open printable page &rarr;</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
