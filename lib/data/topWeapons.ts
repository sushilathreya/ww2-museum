import { getWeaponBySlug } from '@/lib/data/weapons';
import { Weapon } from '@/lib/types/weapon';

interface TopWeaponDefinition {
  slug: string;
  rationale: string;
}

export interface TopWeaponEntry {
  rank: number;
  weapon: Weapon;
  rationale: string;
}

const topWeaponDefinitions: TopWeaponDefinition[] = [
  {
    slug: 't-34',
    rationale: 'Combined mobility, protection, and massive output to shape Eastern Front armored warfare.',
  },
  {
    slug: 'm1-garand',
    rationale: 'Put reliable semi-automatic firepower in standard infantry hands at scale.',
  },
  {
    slug: 'm4-sherman',
    rationale: 'Production volume and mechanical reliability made it strategically decisive in Allied operations.',
  },
  {
    slug: 'spitfire',
    rationale: 'Symbolized RAF air defense and sustained multi-role performance across the war.',
  },
  {
    slug: 'p-51-mustang',
    rationale: 'Long-range escort range changed bomber survivability and strategic air campaign depth.',
  },
  {
    slug: 'kar98k',
    rationale: 'Backbone infantry rifle for Germany with huge production and frontline ubiquity.',
  },
  {
    slug: 'type-vii-uboat',
    rationale: 'Defined Atlantic convoy warfare and forced rapid Allied anti-submarine adaptation.',
  },
  {
    slug: 'tiger-i',
    rationale: 'Set a benchmark for heavy armor lethality despite maintenance and logistics limits.',
  },
];

export function getTopWeapons(limit = 8): TopWeaponEntry[] {
  return topWeaponDefinitions
    .map((entry, index) => {
      const weapon = getWeaponBySlug(entry.slug);
      if (!weapon) return null;
      return {
        rank: index + 1,
        weapon,
        rationale: entry.rationale,
      };
    })
    .filter((entry): entry is TopWeaponEntry => Boolean(entry))
    .slice(0, limit);
}
