import { getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';

export const metadata = {
  title: 'Tanks - Weapons of World War 2',
  description: 'Explore World War II tanks including light, medium, heavy tanks, and tank destroyers.',
};

export default function TanksPage() {
  const tanks = getWeaponsByCategory('tanks');

  return (
    <WeaponGrid
      weapons={tanks}
      category="tanks"
      title="TANKS"
      subtitle="LIGHT, MEDIUM, HEAVY TANKS, AND TANK DESTROYERS"
    />
  );
}
