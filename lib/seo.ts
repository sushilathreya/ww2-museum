import type { Metadata } from 'next';
import { CATEGORY_CONFIG, Weapon, WeaponCategory } from '@/lib/types/weapon';

const RAW_SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://worldwarweapons.com';

export const SITE_NAME = 'World War Weapons';
export const SITE_ORIGIN = RAW_SITE_ORIGIN.replace(/\/+$/, '');
export const DEFAULT_SEO_IMAGE = '/weapons/tiger-i.jpg';
export const SITE_DESCRIPTION =
  'An interactive museum of World War II weapons featuring historical context, technical specifications, and curated records across guns, tanks, planes, naval vessels, and explosives.';

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  if (normalizedPath === '/') {
    return `${SITE_ORIGIN}/`;
  }

  return `${SITE_ORIGIN}${normalizedPath}`;
}

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SEO_IMAGE,
  type = 'website',
}: BuildPageMetadataOptions): Metadata {
  const normalizedPath = normalizePath(path);

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title,
      description,
      url: normalizedPath,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function buildCategoryMetadata(
  category: WeaponCategory,
  title: string,
  description: string,
): Metadata {
  return buildPageMetadata({
    title,
    description,
    path: `/${category}`,
  });
}

export function buildWeaponMetadata(weapon: Weapon): Metadata {
  return buildPageMetadata({
    title: `${weapon.name} - Weapons of World War 2`,
    description: weapon.history.overview,
    path: `/${weapon.category}/${weapon.slug}`,
    image: weapon.imageUrl,
    type: 'article',
  });
}

export function buildCategoryItemListJsonLd(category: WeaponCategory, weapons: Weapon[]) {
  const categoryLabel = CATEGORY_CONFIG[category].label;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryLabel} - World War II Weapons`,
    description: `Browse ${weapons.length} World War II ${categoryLabel.toLowerCase()} records.`,
    url: absoluteUrl(`/${category}`),
    numberOfItems: weapons.length,
    itemListElement: weapons.map((weapon, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: weapon.name,
      url: absoluteUrl(`/${weapon.category}/${weapon.slug}`),
    })),
  };
}

export function buildWeaponBreadcrumbJsonLd(weapon: Weapon) {
  const categoryLabel = CATEGORY_CONFIG[weapon.category].label;
  const categoryPath = `/${weapon.category}`;
  const weaponPath = `${categoryPath}/${weapon.slug}`;

  return {
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
        name: categoryLabel,
        item: absoluteUrl(categoryPath),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: weapon.name,
        item: absoluteUrl(weaponPath),
      },
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
  };
}
