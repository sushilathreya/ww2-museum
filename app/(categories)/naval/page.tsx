import { getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';

export const metadata = {
  title: 'Naval - Weapons of World War 2',
  description: 'Explore World War II naval vessels including battleships, carriers, submarines, and destroyers.',
};

export default function NavalPage() {
  const naval = getWeaponsByCategory('naval');

  return (
    <WeaponGrid
      weapons={naval}
      category="naval"
      title="NAVAL"
      subtitle="BATTLESHIPS, CARRIERS, SUBMARINES, AND DESTROYERS"
    />
  );
}
