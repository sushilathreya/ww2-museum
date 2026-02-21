import { getWeaponBySlug, weapons } from '@/lib/data/weapons';
import { CATEGORY_CONFIG, COUNTRIES, CountryCode, Weapon, WeaponCategory } from '@/lib/types/weapon';

export interface ComparisonCluster {
  slug: string;
  title: string;
  description: string;
  left: Weapon;
  right: Weapon;
}

interface ComparisonDefinition {
  slug: string;
  title: string;
  description: string;
  leftSlug: string;
  rightSlug: string;
}

const comparisonDefinitions: ComparisonDefinition[] = [
  {
    slug: 'm1-garand-vs-kar98k',
    title: 'M1 Garand vs Kar98k',
    description: 'Semi-automatic volume of fire versus bolt-action precision and training doctrine.',
    leftSlug: 'm1-garand',
    rightSlug: 'kar98k',
  },
  {
    slug: 't-34-vs-panzer-iv',
    title: 'T-34 vs Panzer IV',
    description: 'Mobility, sloped armor, and production scale versus iterative upgrades and tactical flexibility.',
    leftSlug: 't-34',
    rightSlug: 'panzer-iv',
  },
  {
    slug: 'tiger-i-vs-m4-sherman',
    title: 'Tiger I vs M4 Sherman',
    description: 'Heavy armor and long-range lethality versus reliability, logistics, and mass deployment.',
    leftSlug: 'tiger-i',
    rightSlug: 'm4-sherman',
  },
  {
    slug: 'p-51-mustang-vs-bf-109',
    title: 'P-51 Mustang vs Bf 109',
    description: 'Escort range and strategic reach versus high-performance interceptor doctrine.',
    leftSlug: 'p-51-mustang',
    rightSlug: 'bf-109',
  },
  {
    slug: 'spitfire-vs-bf-109',
    title: 'Spitfire vs Bf 109',
    description: 'Maneuverability, energy fighting, and pilot training in Europe’s air war.',
    leftSlug: 'spitfire',
    rightSlug: 'bf-109',
  },
  {
    slug: 'bismarck-vs-hms-king-george-v',
    title: 'Bismarck vs HMS King George V',
    description: 'Capital ship survivability, fire-control, and operational risk in Atlantic battles.',
    leftSlug: 'bismarck',
    rightSlug: 'hms-king-george-v',
  },
  {
    slug: 'yamato-vs-uss-iowa',
    title: 'Yamato vs USS Iowa',
    description: 'Battleship doctrine at peak scale: armor and caliber versus speed, radar, and systems integration.',
    leftSlug: 'yamato',
    rightSlug: 'uss-iowa',
  },
  {
    slug: 'type-vii-uboat-vs-fletcher-class-destroyer',
    title: 'Type VII U-boat vs Fletcher-class Destroyer',
    description: 'Submarine attrition strategy versus convoy escort adaptation in the Battle of the Atlantic.',
    leftSlug: 'type-vii-uboat',
    rightSlug: 'fletcher-class-destroyer',
  },
];

export interface BattleCluster {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

const battleClusters: BattleCluster[] = [
  {
    slug: 'normandy-1944',
    title: 'Normandy 1944',
    description: 'Weapons and platforms repeatedly documented across D-Day and the Normandy campaign.',
    keywords: ['normandy', 'd-day', 'overlord', 'operation cobra'],
  },
  {
    slug: 'stalingrad',
    title: 'Stalingrad',
    description: 'Urban attrition and close-range combat platforms linked to the Stalingrad campaigns.',
    keywords: ['stalingrad'],
  },
  {
    slug: 'kursk',
    title: 'Kursk',
    description: 'Armor-centric systems associated with one of history’s largest tank battles.',
    keywords: ['kursk'],
  },
  {
    slug: 'battle-of-the-bulge',
    title: 'Battle of the Bulge',
    description: 'Late-war Western Front equipment tied to Ardennes operations in winter 1944.',
    keywords: ['battle of the bulge', 'ardennes'],
  },
  {
    slug: 'north-africa',
    title: 'North Africa Campaign',
    description: 'Desert-theater weapons and vehicles tied to Mediterranean and North African operations.',
    keywords: ['north africa', 'desert air force', 'rommel'],
  },
  {
    slug: 'battle-of-the-atlantic',
    title: 'Battle of the Atlantic',
    description: 'Submarines, escorts, and naval assets central to convoy warfare and anti-submarine adaptation.',
    keywords: ['battle of the atlantic', 'atlantic', 'wolf pack', 'convoy'],
  },
];

const countryToSlug: Record<CountryCode, string> = {
  US: 'us',
  DE: 'de',
  UK: 'uk',
  JP: 'jp',
  USSR: 'ussr',
  IT: 'it',
  FR: 'fr',
};

const slugToCountry = Object.fromEntries(
  Object.entries(countryToSlug).map(([country, slug]) => [slug, country as CountryCode]),
) as Record<string, CountryCode>;

export interface CountryCategoryCluster {
  country: CountryCode;
  category: WeaponCategory;
  count: number;
}

export interface InternalLink {
  href: string;
  label: string;
  note?: string;
}

function normalizeText(weapon: Weapon): string {
  return [
    weapon.name,
    weapon.designation,
    weapon.history.overview,
    weapon.history.development,
    weapon.history.combatHistory,
    ...weapon.history.notableUses,
  ]
    .join(' ')
    .toLowerCase();
}

export function getComparisonClusters(): ComparisonCluster[] {
  return comparisonDefinitions
    .map((definition) => {
      const left = getWeaponBySlug(definition.leftSlug);
      const right = getWeaponBySlug(definition.rightSlug);
      if (!left || !right) return null;

      return {
        slug: definition.slug,
        title: definition.title,
        description: definition.description,
        left,
        right,
      };
    })
    .filter((entry): entry is ComparisonCluster => Boolean(entry));
}

export function getComparisonBySlug(slug: string): ComparisonCluster | undefined {
  return getComparisonClusters().find((entry) => entry.slug === slug);
}

export function getComparisonsForWeapon(weaponSlug: string): ComparisonCluster[] {
  return getComparisonClusters().filter(
    (entry) => entry.left.slug === weaponSlug || entry.right.slug === weaponSlug,
  );
}

export function getBattleClusters(): BattleCluster[] {
  return battleClusters;
}

export function getWeaponsForBattle(slug: string): Weapon[] {
  const cluster = battleClusters.find((entry) => entry.slug === slug);
  if (!cluster) return [];

  return weapons.filter((weapon) => {
    const content = normalizeText(weapon);
    return cluster.keywords.some((keyword) => content.includes(keyword));
  });
}

export function getBattleClustersForWeapon(weapon: Weapon): BattleCluster[] {
  const content = normalizeText(weapon);
  return battleClusters.filter((cluster) => cluster.keywords.some((keyword) => content.includes(keyword)));
}

export function countryCodeToSlug(code: CountryCode): string {
  return countryToSlug[code];
}

export function countrySlugToCode(slug: string): CountryCode | undefined {
  return slugToCountry[slug];
}

export function getCountryCategoryClusters(): CountryCategoryCluster[] {
  const categories = Object.keys(CATEGORY_CONFIG) as WeaponCategory[];
  const countries = Object.keys(COUNTRIES) as CountryCode[];
  const clusters: CountryCategoryCluster[] = [];

  for (const country of countries) {
    for (const category of categories) {
      const count = weapons.filter((weapon) => weapon.country === country && weapon.category === category).length;
      if (count > 0) {
        clusters.push({ country, category, count });
      }
    }
  }

  return clusters.sort((a, b) => b.count - a.count);
}

export function getWeaponsForCountryCategory(country: CountryCode, category: WeaponCategory): Weapon[] {
  return weapons.filter((weapon) => weapon.country === country && weapon.category === category);
}

export function getRelatedWeapons(weapon: Weapon, limit = 6): Weapon[] {
  const scored = weapons
    .filter((candidate) => candidate.slug !== weapon.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === weapon.category) score += 5;
      if (candidate.subcategory === weapon.subcategory) score += 4;
      if (candidate.country === weapon.country) score += 3;
      if (candidate.manufacturer === weapon.manufacturer) score += 1;
      if (Math.abs(candidate.yearIntroduced - weapon.yearIntroduced) <= 3) score += 1;

      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.candidate.featured) - Number(a.candidate.featured));

  return scored.slice(0, limit).map((entry) => entry.candidate);
}

export function getCountryCategoryLink(weapon: Weapon): InternalLink {
  const countrySlug = countryCodeToSlug(weapon.country);
  const categoryLabel = CATEGORY_CONFIG[weapon.category].label;
  return {
    href: `/country/${countrySlug}/${weapon.category}`,
    label: `${COUNTRIES[weapon.country].name} ${categoryLabel}`,
    note: 'Browse similar records by country and class.',
  };
}

export function getComparisonLinksForWeapon(weaponSlug: string): InternalLink[] {
  return getComparisonsForWeapon(weaponSlug).map((comparison) => ({
    href: `/compare/${comparison.slug}`,
    label: comparison.title,
    note: comparison.description,
  }));
}

export function getBattleLinksForWeapon(weapon: Weapon): InternalLink[] {
  return getBattleClustersForWeapon(weapon).map((cluster) => ({
    href: `/battles/${cluster.slug}`,
    label: cluster.title,
    note: cluster.description,
  }));
}

export function getRelatedWeaponLinks(weapon: Weapon, limit = 6): InternalLink[] {
  return getRelatedWeapons(weapon, limit).map((related) => ({
    href: `/${related.category}/${related.slug}`,
    label: related.name,
    note: `${CATEGORY_CONFIG[related.category].label} • ${related.yearIntroduced}`,
  }));
}
