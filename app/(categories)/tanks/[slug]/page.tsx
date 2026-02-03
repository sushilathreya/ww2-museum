import { notFound } from 'next/navigation';
import { getWeaponBySlug, getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponDetail } from '@/components/weapons/WeaponDetail';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getWeaponsByCategory('tanks').map((weapon) => ({
    slug: weapon.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: 'Not Found' };

  return {
    title: `${weapon.name} - WW2 Arsenal`,
    description: weapon.history.overview,
  };
}

export default function TankDetailPage({ params }: PageProps) {
  const weapon = getWeaponBySlug(params.slug);

  if (!weapon || weapon.category !== 'tanks') {
    notFound();
  }

  return <WeaponDetail weapon={weapon} />;
}
