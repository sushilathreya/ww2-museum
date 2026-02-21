import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import {
  countryCodeToSlug,
  countrySlugToCode,
  getCountryCategoryClusters,
  getWeaponsForCountryCategory,
} from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES, WeaponCategory } from '@/lib/types/weapon';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

interface PageProps {
  params: {
    country: string;
    category: string;
  };
}

export function generateStaticParams() {
  return getCountryCategoryClusters().map((cluster) => ({
    country: countryCodeToSlug(cluster.country),
    category: cluster.category,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const country = countrySlugToCode(params.country);
  const category = params.category as WeaponCategory;
  if (!country || !(category in CATEGORY_CONFIG)) return { title: 'Not Found' };

  const title = `${COUNTRIES[country].name} ${CATEGORY_CONFIG[category].label} - World War Weapons`;
  const description = `Browse ${COUNTRIES[country].name} World War II ${CATEGORY_CONFIG[category].label.toLowerCase()} records and linked weapon detail pages.`;

  return buildPageMetadata({
    title,
    description,
    path: `/country/${params.country}/${category}`,
  });
}

export default function CountryCategoryPage({ params }: PageProps) {
  const country = countrySlugToCode(params.country);
  const category = params.category as WeaponCategory;
  if (!country || !(category in CATEGORY_CONFIG)) {
    notFound();
  }

  const linkedWeapons = getWeaponsForCountryCategory(country, category);
  if (linkedWeapons.length === 0) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${COUNTRIES[country].name} ${CATEGORY_CONFIG[category].label}`,
    url: absoluteUrl(`/country/${params.country}/${category}`),
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
      <ResearchHomeLogo className="mb-4" />

      <Link href="/country" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-military-gold">
        <span>&larr;</span>
        <span>BACK TO COUNTRY HUBS</span>
      </Link>

      <header className="mt-4 mb-8 rounded-xl border border-gray-800 bg-gray-950/70 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Country Cluster</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">
          {COUNTRIES[country].name} {CATEGORY_CONFIG[category].label}
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Indexed records for {COUNTRIES[country].name} in the {CATEGORY_CONFIG[category].label.toLowerCase()} category.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {linkedWeapons.map((weapon) => (
          <Link
            key={weapon.id}
            href={`/${weapon.category}/${weapon.slug}`}
            className="rounded-lg border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-military-gold/50"
          >
            <p className="text-xs font-mono uppercase text-gray-500">{weapon.subcategory.replace('-', ' ')}</p>
            <p className="mt-2 font-display text-2xl text-white">{weapon.name}</p>
            <p className="mt-1 text-sm text-gray-400">{weapon.yearIntroduced}</p>
            <p className="mt-2 text-sm text-gray-300 line-clamp-3">{weapon.history.overview}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
