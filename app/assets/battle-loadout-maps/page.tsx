import { BattleLoadoutExplorer } from '@/components/assets/BattleLoadoutExplorer';
import { JsonLd } from '@/components/seo/JsonLd';
import { ResearchHomeLogo } from '@/components/layout/ResearchHomeLogo';
import { getBattleLoadoutMaps } from '@/lib/data/phase3';
import { absoluteUrl, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'WW2 Battle Loadout Maps - World War Weapons',
  description:
    'Explore battle loadout maps by theater and year, with lane-based operational views linked to WW2 weapon records.',
  path: '/assets/battle-loadout-maps',
});

export default function BattleLoadoutMapsPage() {
  const maps = getBattleLoadoutMaps();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'WW2 Battle Loadout Maps',
    url: absoluteUrl('/assets/battle-loadout-maps'),
    numberOfItems: maps.length,
    itemListElement: maps.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${entry.title} loadout map`,
      url: absoluteUrl(`/assets/battle-loadout-maps#${entry.slug}`),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={schema} />
      <ResearchHomeLogo className="mb-5" />

      <header className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold">Phase 3 Linkable Asset</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl stencil-text">Battle Loadout Maps</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300 sm:text-base">
          Filter by theater and year to inspect campaign loadouts. Each operational lane links directly to the source
          weapon records used in the map.
        </p>
      </header>

      <BattleLoadoutExplorer maps={maps} />
    </main>
  );
}
