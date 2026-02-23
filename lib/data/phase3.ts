import { getBattleClusters, getWeaponsForBattle } from '@/lib/data/phase2';
import { CATEGORY_CONFIG, COUNTRIES, WeaponCategory } from '@/lib/types/weapon';

interface LoadoutLaneDefinition {
  id: string;
  title: string;
  description: string;
  categories: WeaponCategory[];
  limit?: number;
}

interface BattleLoadoutDefinition {
  battleSlug: string;
  theater: string;
  year: number;
  summary: string;
  lanes: LoadoutLaneDefinition[];
}

const battleLoadoutDefinitions: BattleLoadoutDefinition[] = [
  {
    battleSlug: 'north-africa',
    theater: 'Mediterranean and North Africa',
    year: 1942,
    summary: 'Desert maneuver warfare emphasized mobility, long-range gunnery, and resilient logistics lines.',
    lanes: [
      {
        id: 'armor-spearhead',
        title: 'Armor Spearhead',
        description: 'Medium and heavy tanks driving breakthrough and exploitation tempo.',
        categories: ['tanks'],
      },
      {
        id: 'air-support',
        title: 'Air Support',
        description: 'Fighters and bombers shaping battlefield initiative across open terrain.',
        categories: ['planes'],
      },
      {
        id: 'infantry-screen',
        title: 'Infantry Screen',
        description: 'Rifles, machine guns, and explosives reinforcing captured objectives.',
        categories: ['guns', 'explosives'],
      },
    ],
  },
  {
    battleSlug: 'stalingrad',
    theater: 'Eastern Front',
    year: 1942,
    summary: 'Urban attrition forced close-quarters doctrine, resilient assault groups, and high-ammo sustainment.',
    lanes: [
      {
        id: 'urban-assault',
        title: 'Urban Assault',
        description: 'SMGs, grenades, and support guns for room-to-room combat.',
        categories: ['guns', 'explosives'],
      },
      {
        id: 'armor-points',
        title: 'Armor Strongpoints',
        description: 'Assault armor systems used as mobile strongpoints inside city sectors.',
        categories: ['tanks'],
      },
      {
        id: 'air-pressure',
        title: 'Air Pressure',
        description: 'Air assets tasked with disruption, reconnaissance, and interdiction.',
        categories: ['planes'],
      },
    ],
  },
  {
    battleSlug: 'battle-of-the-atlantic',
    theater: 'Atlantic Ocean',
    year: 1943,
    summary: 'Convoy warfare centered on escort coordination, submarine stealth cycles, and anti-submarine adaptation.',
    lanes: [
      {
        id: 'submarine-threat',
        title: 'Submarine Threat Axis',
        description: 'U-boat and submarine systems applying attritional pressure on shipping lanes.',
        categories: ['naval'],
      },
      {
        id: 'escort-screen',
        title: 'Escort Screen',
        description: 'Destroyers and escort vessels protecting convoy integrity.',
        categories: ['naval'],
      },
      {
        id: 'air-gap-closure',
        title: 'Air Gap Closure',
        description: 'Long-range patrol and strike aircraft reducing submarine freedom of action.',
        categories: ['planes'],
      },
    ],
  },
  {
    battleSlug: 'kursk',
    theater: 'Eastern Front',
    year: 1943,
    summary: 'Layered defense and armored counterstroke defined one of history’s largest tank engagements.',
    lanes: [
      {
        id: 'anti-armor-line',
        title: 'Anti-Armor Line',
        description: 'Minefields, anti-tank positions, and supporting infantry teams.',
        categories: ['explosives', 'guns'],
      },
      {
        id: 'armored-counterattack',
        title: 'Armored Counterattack',
        description: 'Mass armor formations contesting operational depth.',
        categories: ['tanks'],
      },
      {
        id: 'close-air-strike',
        title: 'Close Air Strike',
        description: 'Air systems delivering interdiction and tactical disruption.',
        categories: ['planes'],
      },
    ],
  },
  {
    battleSlug: 'normandy-1944',
    theater: 'Western Europe',
    year: 1944,
    summary: 'Combined-arms doctrine synchronized naval firepower, armored mobility, and air superiority during the breakout.',
    lanes: [
      {
        id: 'beachhead-entry',
        title: 'Beachhead Entry',
        description: 'Naval support and explosives opening lanes through fortified defenses.',
        categories: ['naval', 'explosives'],
      },
      {
        id: 'breakout-armor',
        title: 'Breakout Armor',
        description: 'Tank and mechanized systems expanding the bridgehead inland.',
        categories: ['tanks'],
      },
      {
        id: 'air-dominance',
        title: 'Air Dominance',
        description: 'Fighter-bomber operations isolating battlefield nodes and supply routes.',
        categories: ['planes'],
      },
      {
        id: 'infantry-hold',
        title: 'Infantry Hold',
        description: 'Infantry weapons and support systems securing captured sectors.',
        categories: ['guns'],
      },
    ],
  },
  {
    battleSlug: 'battle-of-the-bulge',
    theater: 'Western Europe',
    year: 1944,
    summary: 'Winter operations rewarded logistical resilience, anti-armor flexibility, and adaptive close support.',
    lanes: [
      {
        id: 'shock-thrust',
        title: 'Shock Thrust',
        description: 'Armored penetration and maneuver assets driving surprise offensives.',
        categories: ['tanks'],
      },
      {
        id: 'defensive-depth',
        title: 'Defensive Depth',
        description: 'Infantry and anti-armor kits hardening chokepoints and roads.',
        categories: ['guns', 'explosives'],
      },
      {
        id: 'air-recovery',
        title: 'Air Recovery',
        description: 'Air power restoring momentum once weather windows opened.',
        categories: ['planes'],
      },
    ],
  },
];

export interface LoadoutWeaponCard {
  slug: string;
  name: string;
  category: WeaponCategory;
  countryName: string;
  countryFlag: string;
  yearIntroduced: number;
  imageUrl: string;
}

export interface BattleLoadoutLane {
  id: string;
  title: string;
  description: string;
  categories: WeaponCategory[];
  weapons: LoadoutWeaponCard[];
}

export interface BattleLoadoutMap {
  slug: string;
  title: string;
  description: string;
  battleSlug: string;
  theater: string;
  year: number;
  summary: string;
  categoryCounts: { category: WeaponCategory; label: string; count: number }[];
  featuredWeapons: LoadoutWeaponCard[];
  lanes: BattleLoadoutLane[];
}

function byPriority<T extends { featured: boolean; yearIntroduced: number; name: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.yearIntroduced - a.yearIntroduced || a.name.localeCompare(b.name),
  );
}

function pickWeaponsForCategories<
  T extends { category: WeaponCategory; featured: boolean; yearIntroduced: number; name: string },
>(
  items: T[],
  categories: WeaponCategory[],
  limit: number,
): T[] {
  return byPriority(items.filter((item) => categories.includes(item.category))).slice(0, limit);
}

function toWeaponCard(weapon: {
  slug: string;
  name: string;
  category: WeaponCategory;
  country: keyof typeof COUNTRIES;
  yearIntroduced: number;
  imageUrl: string;
}): LoadoutWeaponCard {
  return {
    slug: weapon.slug,
    name: weapon.name,
    category: weapon.category,
    countryName: COUNTRIES[weapon.country].name,
    countryFlag: COUNTRIES[weapon.country].flag,
    yearIntroduced: weapon.yearIntroduced,
    imageUrl: weapon.imageUrl,
  };
}

export function getBattleLoadoutMaps(): BattleLoadoutMap[] {
  const clusters = new Map(getBattleClusters().map((cluster) => [cluster.slug, cluster]));

  return battleLoadoutDefinitions
    .map((definition) => {
      const cluster = clusters.get(definition.battleSlug);
      if (!cluster) return null;

      const linkedWeapons = byPriority(getWeaponsForBattle(definition.battleSlug));
      if (linkedWeapons.length === 0) return null;

      const categoryCounts = (Object.keys(CATEGORY_CONFIG) as WeaponCategory[])
        .map((category) => ({
          category,
          label: CATEGORY_CONFIG[category].label,
          count: linkedWeapons.filter((weapon) => weapon.category === category).length,
        }))
        .filter((entry) => entry.count > 0);

      const lanes = definition.lanes
        .map((lane) => ({
          ...lane,
          weapons: pickWeaponsForCategories(linkedWeapons, lane.categories, lane.limit ?? 3).map(toWeaponCard),
        }))
        .filter((lane) => lane.weapons.length > 0);

      return {
        slug: definition.battleSlug,
        title: cluster.title,
        description: cluster.description,
        battleSlug: cluster.slug,
        theater: definition.theater,
        year: definition.year,
        summary: definition.summary,
        categoryCounts,
        featuredWeapons: linkedWeapons.slice(0, 8).map(toWeaponCard),
        lanes,
      };
    })
    .filter((entry): entry is BattleLoadoutMap => Boolean(entry))
    .sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}
