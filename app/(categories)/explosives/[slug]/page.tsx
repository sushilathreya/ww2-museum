import { notFound } from 'next/navigation';
import { getWeaponBySlug, getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponDetail } from '@/components/weapons/WeaponDetail';
import type { Metadata } from 'next';
import { buildWeaponBreadcrumbJsonLd, buildWeaponMetadata } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getWeaponsByCategory('explosives').map((weapon) => ({
    slug: weapon.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: 'Not Found' };

  return buildWeaponMetadata(weapon);
}

export default function ExplosiveDetailPage({ params }: PageProps) {
  const weapon = getWeaponBySlug(params.slug);

  if (!weapon || weapon.category !== 'explosives') {
    notFound();
  }

  const breadcrumbJsonLd = buildWeaponBreadcrumbJsonLd(weapon);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <WeaponDetail weapon={weapon} />
    </>
  );
}
