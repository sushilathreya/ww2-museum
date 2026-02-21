import { getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';

export const metadata = {
  title: 'Explosives - Weapons of World War 2',
  description:
    'Explore World War II explosive ordnance including grenades, anti-tank charges, mines, demolition charges, and incendiaries.',
};

export default function ExplosivesPage() {
  const explosives = getWeaponsByCategory('explosives');

  return (
    <WeaponGrid
      weapons={explosives}
      category="explosives"
      title="EXPLOSIVES"
      subtitle="GRENADES, MINES, DEMOLITION CHARGES, AND INCENDIARIES"
    />
  );
}
