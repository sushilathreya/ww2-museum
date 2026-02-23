import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PrintToolbar } from '@/components/assets/PrintToolbar';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getComparisonBySlug, getComparisonClusters } from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES, Weapon } from '@/lib/types/weapon';
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
    title: `${comparison.title} Printable Sheet - WW2`,
    description: comparison.description,
    path: `/assets/comparison-sheets/${comparison.slug}`,
    image: comparison.left.imageUrl,
  });
}

export default function PrintableComparisonSheetPage({ params }: PageProps) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${comparison.title} printable comparison sheet`,
    description: comparison.description,
    url: absoluteUrl(`/assets/comparison-sheets/${comparison.slug}`),
    about: [comparison.left.name, comparison.right.name],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 print:max-w-[186mm] print:px-0 print:py-0">
      <JsonLd data={schema} />
      <div className="print:hidden">
        <ResearchHomeLogo className="mb-4" />
        <Link
          href="/assets/comparison-sheets"
          className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 transition-colors hover:text-military-gold"
        >
          <span>&larr;</span>
          <span>BACK TO SHEETS</span>
        </Link>
      </div>

      <PrintToolbar title="Printable Comparison Sheet" />

      <article className="rounded-xl border border-gray-800 bg-gray-950/70 p-6 sm:p-8 print:rounded-none print:border-black print:bg-white print:p-4">
        <header className="border-b border-gray-800 pb-5 print:border-black">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-military-gold print:text-black">
            World War Weapons • Printable Reference
          </p>
          <h1 className="mt-2 font-display text-5xl text-white stencil-text print:text-3xl print:tracking-normal print:text-black">{comparison.title}</h1>
          <p className="mt-3 max-w-4xl text-sm text-gray-300 print:text-black">{comparison.description}</p>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-2 print:grid-cols-1">
          {[comparison.left, comparison.right].map((weapon) => (
            <article key={weapon.id} className="rounded-lg border border-gray-800 bg-gray-900/55 p-4 print:[break-inside:avoid-page] print:[page-break-inside:avoid] print:border-black print:bg-white">
              <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded bg-black/45 print:border print:border-black print:bg-white">
                <Image
                  src={assetPath(weapon.imageUrl)}
                  alt={weapon.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500 print:text-black">
                {COUNTRIES[weapon.country].name} • {CATEGORY_CONFIG[weapon.category].label}
              </p>
              <h2 className="mt-1 font-display text-4xl text-white print:text-3xl print:text-black">{weapon.name}</h2>
              <p className="text-sm text-gray-400 print:text-black">{weapon.designation}</p>

              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded border border-gray-800 bg-black/25 px-2 py-1.5 print:border-black print:bg-white">
                  <dt className="text-gray-500 print:text-black">Introduced</dt>
                  <dd className="text-gray-200 print:text-black">{weapon.yearIntroduced}</dd>
                </div>
                <div className="rounded border border-gray-800 bg-black/25 px-2 py-1.5 print:border-black print:bg-white">
                  <dt className="text-gray-500 print:text-black">Manufacturer</dt>
                  <dd className="text-gray-200 print:text-black">{weapon.manufacturer}</dd>
                </div>
                <div className="rounded border border-gray-800 bg-black/25 px-2 py-1.5 print:border-black print:bg-white">
                  <dt className="text-gray-500 print:text-black">Type</dt>
                  <dd className="text-gray-200 print:text-black">{weapon.subcategory.replace('-', ' ')}</dd>
                </div>
                <div className="rounded border border-gray-800 bg-black/25 px-2 py-1.5 print:border-black print:bg-white">
                  <dt className="text-gray-500 print:text-black">Service Window</dt>
                  <dd className="text-gray-200 print:text-black">
                    {weapon.yearIntroduced} - {weapon.yearRetired ?? 'Post-war'}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-sm text-gray-300 leading-relaxed print:text-black">{weapon.history.overview}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2 print:grid-cols-1">
          {[comparison.left, comparison.right].map((weapon) => (
            <article key={`${weapon.id}-specs`} className="rounded-lg border border-gray-800 bg-gray-900/55 p-4 print:[break-inside:avoid-page] print:[page-break-inside:avoid] print:border-black print:bg-white">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-military-gold print:text-black">
                {weapon.name} Key Specs
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-xs font-mono">
                {buildComparisonSpecRows(weapon).map(([label, value]) => (
                  <div key={`${weapon.id}-${label}`} className="flex items-start justify-between gap-4 rounded border border-gray-800 bg-black/30 px-2.5 py-2 print:border-black print:bg-white">
                    <dt className="text-gray-500 uppercase print:text-black">{label}</dt>
                    <dd className="text-right text-gray-200 print:text-black">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4 print:[break-inside:avoid-page] print:[page-break-inside:avoid] print:border-black print:bg-white">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-military-gold print:text-black">
            Operational Tradeoff Summary
          </h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2 print:grid-cols-1">
            <article className="rounded border border-gray-800 bg-black/25 p-3 print:border-black print:bg-white">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-gray-500 print:text-black">
                {comparison.left.name}
              </p>
              <p className="mt-2 text-sm text-gray-300 print:text-black">{buildDoctrineSummary(comparison.left)}</p>
            </article>
            <article className="rounded border border-gray-800 bg-black/25 p-3 print:border-black print:bg-white">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-gray-500 print:text-black">
                {comparison.right.name}
              </p>
              <p className="mt-2 text-sm text-gray-300 print:text-black">{buildDoctrineSummary(comparison.right)}</p>
            </article>
          </div>
        </section>

        <footer className="mt-6 border-t border-gray-800 pt-4 text-xs font-mono uppercase tracking-[0.12em] text-gray-500 print:border-black print:text-black">
          Source: worldwarweapons.com • Comparison route: {absoluteUrl(`/compare/${comparison.slug}`)}
        </footer>
      </article>
    </main>
  );
}

function buildDoctrineSummary(weapon: Weapon): string {
  const intro = `${weapon.name} entered service in ${weapon.yearIntroduced} as a ${weapon.subcategory.replace('-', ' ')}`;
  const categoryLens =
    weapon.category === 'tanks'
      ? 'and its battlefield value came from armor, mobility, and crew survivability under sustained pressure.'
      : weapon.category === 'planes'
        ? 'and its battlefield value came from sortie tempo, range discipline, and control of air windows.'
        : weapon.category === 'naval'
          ? 'and its battlefield value came from endurance, escort doctrine, and control of maritime approaches.'
          : weapon.category === 'explosives'
            ? 'and its battlefield value came from close-range disruption, denial, and defensive shaping.'
            : 'and its battlefield value came from controllable firepower, reliability, and infantry integration.';

  return `${intro} ${categoryLens}`;
}
