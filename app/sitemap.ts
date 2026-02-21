import type { MetadataRoute } from 'next';
import { weapons } from '@/lib/data/weapons';
import type { WeaponCategory } from '@/lib/types/weapon';
import { absoluteUrl } from '@/lib/seo';

const categories: WeaponCategory[] = ['guns', 'tanks', 'planes', 'naval', 'explosives'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
  ];

  const weaponRoutes: MetadataRoute.Sitemap = weapons.map((weapon) => ({
    url: absoluteUrl(`/${weapon.category}/${weapon.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...coreRoutes, ...weaponRoutes];
}
