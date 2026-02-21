import type { MetadataRoute } from 'next';
import { weapons } from '@/lib/data/weapons';
import {
  countryCodeToSlug,
  getBattleClusters,
  getComparisonClusters,
  getCountryCategoryClusters,
  getWeaponsForBattle,
} from '@/lib/data/phase2';
import type { WeaponCategory } from '@/lib/types/weapon';
import { absoluteUrl } from '@/lib/seo';

const categories: WeaponCategory[] = ['guns', 'tanks', 'planes', 'naval', 'explosives'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const comparisonClusters = getComparisonClusters();
  const battleClusters = getBattleClusters().filter((cluster) => getWeaponsForBattle(cluster.slug).length > 0);
  const countryClusters = getCountryCategoryClusters();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categories.map((category) => ({
      url: absoluteUrl(`/${category}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: absoluteUrl('/compare'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/battles'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/country'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const phaseTwoRoutes: MetadataRoute.Sitemap = [
    ...comparisonClusters.map((cluster) => ({
      url: absoluteUrl(`/compare/${cluster.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...battleClusters.map((cluster) => ({
      url: absoluteUrl(`/battles/${cluster.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...countryClusters.map((cluster) => ({
      url: absoluteUrl(`/country/${countryCodeToSlug(cluster.country)}/${cluster.category}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),
  ];

  const weaponRoutes: MetadataRoute.Sitemap = weapons.map((weapon) => ({
    url: absoluteUrl(`/${weapon.category}/${weapon.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...coreRoutes, ...phaseTwoRoutes, ...weaponRoutes];
}
