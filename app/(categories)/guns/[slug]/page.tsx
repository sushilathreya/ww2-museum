import { notFound } from 'next/navigation';
import { getWeaponBySlug, getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponDetail } from '@/components/weapons/WeaponDetail';
import type { Metadata } from 'next';
import {
  getBattleLinksForWeapon,
  getComparisonLinksForWeapon,
  getCountryCategoryLink,
  getRelatedWeaponLinks,
} from '@/lib/data/phase2';
import { buildWeaponBreadcrumbJsonLd, buildWeaponMetadata } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getWeaponsByCategory('guns').map((weapon) => ({
    slug: weapon.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: 'Not Found' };

  return buildWeaponMetadata(weapon);
}

export default function GunDetailPage({ params }: PageProps) {
  const weapon = getWeaponBySlug(params.slug);

  if (!weapon || weapon.category !== 'guns') {
    notFound();
  }

  const breadcrumbJsonLd = buildWeaponBreadcrumbJsonLd(weapon);
  const relatedLinks = getRelatedWeaponLinks(weapon);
  const comparisonLinks = getComparisonLinksForWeapon(weapon.slug);
  const battleLinks = getBattleLinksForWeapon(weapon);
  const countryCategoryLink = getCountryCategoryLink(weapon);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <WeaponDetail
        weapon={weapon}
        relatedLinks={relatedLinks}
        comparisonLinks={comparisonLinks}
        battleLinks={battleLinks}
        countryCategoryLink={countryCategoryLink}
      />
    </>
  );
}
