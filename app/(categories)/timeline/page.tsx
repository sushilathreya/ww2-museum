import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { WeaponTimeline } from '@/components/timeline/WeaponTimeline';
import { weapons } from '@/lib/data/weapons';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Interactive WW2 Weapon Timeline - World War Weapons',
  description:
    'Explore an interactive timeline of World War II weapons with year-by-year introductions, category filters, and linked records.',
  path: '/timeline',
});

export default function TimelinePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Interactive WW2 Weapon Timeline',
    description:
      'Timeline view of weapon introductions with category and country filters.',
    url: absoluteUrl('/timeline'),
    numberOfItems: weapons.length,
    itemListElement: weapons.slice(0, 20).map((weapon, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: weapon.name,
      url: absoluteUrl(`/${weapon.category}/${weapon.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="mb-4 max-w-6xl">
        <ResearchHomeLogo />
      </div>
      <WeaponTimeline weapons={weapons} />
    </>
  );
}
