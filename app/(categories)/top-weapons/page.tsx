import Link from 'next/link';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { JsonLd } from '@/components/seo/JsonLd';
import { TopWeaponsList } from '@/components/top/TopWeaponsList';
import { getTopWeapons } from '@/lib/data/topWeapons';
import { CATEGORY_CONFIG, COUNTRIES } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Best WW2 Weapons Ranked: Top 8 List - World War Weapons',
  description:
    'Explore the best WW2 weapons in a curated top 8 ranking with historical context, key specifications, and links to full weapon records.',
  path: '/top-weapons',
  image: '/weapons/t-34.jpg',
  type: 'article',
  keywords: [
    'best ww2 weapons',
    'top 8 ww2 weapons',
    'world war 2 weapons list',
    'most important ww2 weapons',
    'ww2 tanks and rifles',
  ],
});

export default function TopWeaponsPage() {
  const entries = getTopWeapons(8);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 8 WW2 Weapons',
    description: 'Curated ranking of major World War II weapon systems by battlefield impact and strategic influence.',
    url: absoluteUrl('/top-weapons'),
    numberOfItems: entries.length,
    itemListElement: entries.map((entry) => ({
      '@type': 'ListItem',
      position: entry.rank,
      name: entry.weapon.name,
      url: absoluteUrl(`/${entry.weapon.category}/${entry.weapon.slug}`),
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Top 8 WW2 Weapons',
        item: absoluteUrl('/top-weapons'),
      },
    ],
  };

  const faqItems = [
    {
      question: 'What are the best WW2 weapons overall?',
      answer:
        'This page ranks eight standout World War II weapons based on battlefield impact, production scale, operational reliability, and strategic influence.',
    },
    {
      question: 'How were these top WW2 weapons selected?',
      answer:
        'The shortlist weighs combat record, industrial output, doctrine influence, and longevity in service rather than only raw specifications.',
    },
    {
      question: 'Are tanks, guns, planes, and naval weapons all included?',
      answer:
        'Yes. The ranking spans multiple classes so readers can compare how different weapon categories shaped campaigns across land, air, and sea.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best WW2 Weapons Ranked: Top 8 List',
    description:
      'Interactive World War II weapon ranking with filters, quick specs, and links to detailed weapon profiles.',
    url: absoluteUrl('/top-weapons'),
    mainEntity: {
      '@id': absoluteUrl('/top-weapons#itemlist'),
    },
  };

  return (
    <>
      <JsonLd data={{ ...itemListSchema, '@id': absoluteUrl('/top-weapons#itemlist') }} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={collectionPageSchema} />
      <div className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
        <ResearchHomeLogo />
      </div>
      <TopWeaponsList entries={entries} />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 sm:p-7">
          <h2 className="font-display text-3xl text-white sm:text-4xl">Why These Are Considered Top WW2 Weapons</h2>
          <p className="mt-3 text-sm text-gray-300 sm:text-base">
            This ranking focuses on operational impact, not just headline specifications. Weapons that repeatedly
            influenced campaign outcomes, proved producible at scale, and changed tactical decision-making rank
            highest. Use this list as a fast entry point, then open each profile for full development and combat
            history.
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {entries.map((entry) => (
              <li key={entry.weapon.id} className="rounded border border-gray-800 bg-black/35 p-3">
                <h3 className="font-display text-2xl text-white">
                  #{entry.rank}{' '}
                  <Link href={`/${entry.weapon.category}/${entry.weapon.slug}`} className="hover:text-military-gold">
                    {entry.weapon.name}
                  </Link>
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wide text-gray-500">
                  {COUNTRIES[entry.weapon.country].flag} {COUNTRIES[entry.weapon.country].name} •{' '}
                  {CATEGORY_CONFIG[entry.weapon.category].label} • Introduced {entry.weapon.yearIntroduced}
                </p>
                <p className="mt-2 text-sm text-gray-300">{entry.rationale}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <h2 className="font-display text-3xl text-white">Related WW2 Research Pages</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/timeline" className="text-military-gold hover:text-white">
                  Interactive WW2 weapon timeline
                </Link>
                {' '}for year-by-year adoption context.
              </li>
              <li>
                <Link href="/compare" className="text-military-gold hover:text-white">
                  Weapon comparison pages
                </Link>
                {' '}for direct system-vs-system analysis.
              </li>
              <li>
                <Link href="/battles" className="text-military-gold hover:text-white">
                  Battle context hubs
                </Link>
                {' '}for campaign-level weapon usage.
              </li>
              <li>
                <Link href="/country" className="text-military-gold hover:text-white">
                  Country and class clusters
                </Link>
                {' '}to study national doctrine patterns.
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <h2 className="font-display text-3xl text-white">Top 8 WW2 Weapons FAQ</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded border border-gray-800 bg-black/35 p-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-military-gold">{item.question}</h3>
                  <p className="mt-2 text-sm text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
