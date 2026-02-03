import { getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';

export const metadata = {
  title: 'Planes - WW2 Arsenal',
  description: 'Explore World War II aircraft including fighters, bombers, and transport planes.',
};

export default function PlanesPage() {
  const planes = getWeaponsByCategory('planes');

  return (
    <WeaponGrid
      weapons={planes}
      category="planes"
      title="PLANES"
      subtitle="FIGHTERS, BOMBERS, AND TRANSPORT AIRCRAFT"
    />
  );
}
