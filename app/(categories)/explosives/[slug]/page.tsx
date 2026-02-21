import { notFound } from 'next/navigation';
import { getWeaponBySlug, getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponDetail } from '@/components/weapons/WeaponDetail';
import type { Metadata } from 'next';

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

  return {
    title: `${weapon.name} - Weapons of World War 2`,
    description: weapon.history.overview,
  };
}

export default function ExplosiveDetailPage({ params }: PageProps) {
  const weapon = getWeaponBySlug(params.slug);

  if (!weapon || weapon.category !== 'explosives') {
    notFound();
  }

  return <WeaponDetail weapon={weapon} />;
}
