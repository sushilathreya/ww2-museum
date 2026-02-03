export type WeaponCategory = 'guns' | 'tanks' | 'planes' | 'naval';

export type GunSubcategory = 'handgun' | 'smg' | 'rifle' | 'sniper' | 'machinegun';
export type TankSubcategory = 'light-tank' | 'medium-tank' | 'heavy-tank' | 'tank-destroyer';
export type PlaneSubcategory = 'fighter' | 'bomber' | 'transport';
export type NavalSubcategory = 'battleship' | 'carrier' | 'submarine' | 'destroyer';

export type WeaponSubcategory =
  | GunSubcategory
  | TankSubcategory
  | PlaneSubcategory
  | NavalSubcategory;

export type CountryCode = 'US' | 'DE' | 'UK' | 'JP' | 'USSR' | 'IT' | 'FR';

export interface GunSpecs {
  caliber: string;
  action: string;
  rateOfFire: number;
  muzzleVelocity: number;
  effectiveRange: number;
  magazineCapacity: number;
  weight: number;
  length: number;
}

export interface TankSpecs {
  crew: number;
  weight: number;
  armor: { front: number; side: number; rear: number };
  mainArmament: string;
  engine: string;
  maxSpeed: number;
  range: number;
  productionCount: number;
}

export interface PlaneSpecs {
  crew: number;
  wingspan: number;
  maxSpeed: number;
  range: number;
  ceiling: number;
  armament: string[];
  engine: string;
  productionCount: number;
}

export interface NavalSpecs {
  displacement: number;
  length: number;
  speed: number;
  range: number;
  crew: number;
  armament: string[];
  armor: { belt: number; deck: number };
}

export interface Weapon {
  id: string;
  slug: string;
  name: string;
  designation: string;
  category: WeaponCategory;
  subcategory: WeaponSubcategory;
  country: CountryCode;
  manufacturer: string;
  yearIntroduced: number;
  yearRetired?: number;

  model3dUrl?: string;
  imageUrl: string;

  specs: GunSpecs | TankSpecs | PlaneSpecs | NavalSpecs;

  history: {
    overview: string;
    development: string;
    combatHistory: string;
    notableUses: string[];
  };

  featured: boolean;
}

export const COUNTRIES: Record<CountryCode, { name: string; flag: string }> = {
  US: { name: 'United States', flag: '🇺🇸' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  UK: { name: 'United Kingdom', flag: '🇬🇧' },
  JP: { name: 'Japan', flag: '🇯🇵' },
  USSR: { name: 'Soviet Union', flag: '☭' },
  IT: { name: 'Italy', flag: '🇮🇹' },
  FR: { name: 'France', flag: '🇫🇷' },
};

export const CATEGORY_CONFIG: Record<
  WeaponCategory,
  { label: string; subcategories: { slug: WeaponSubcategory; label: string }[] }
> = {
  guns: {
    label: 'GUNS',
    subcategories: [
      { slug: 'handgun', label: 'Handguns' },
      { slug: 'smg', label: 'SMGs' },
      { slug: 'rifle', label: 'Rifles' },
      { slug: 'sniper', label: 'Snipers' },
      { slug: 'machinegun', label: 'Machine Guns' },
    ],
  },
  tanks: {
    label: 'TANKS',
    subcategories: [
      { slug: 'light-tank', label: 'Light Tanks' },
      { slug: 'medium-tank', label: 'Medium Tanks' },
      { slug: 'heavy-tank', label: 'Heavy Tanks' },
      { slug: 'tank-destroyer', label: 'Tank Destroyers' },
    ],
  },
  planes: {
    label: 'PLANES',
    subcategories: [
      { slug: 'fighter', label: 'Fighters' },
      { slug: 'bomber', label: 'Bombers' },
      { slug: 'transport', label: 'Transport' },
    ],
  },
  naval: {
    label: 'NAVAL',
    subcategories: [
      { slug: 'battleship', label: 'Battleships' },
      { slug: 'carrier', label: 'Carriers' },
      { slug: 'submarine', label: 'Submarines' },
      { slug: 'destroyer', label: 'Destroyers' },
    ],
  },
};
