import { getWeaponsByCategory } from '@/lib/data/weapons';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';

export const metadata = {
  title: 'Guns - WW2 Arsenal',
  description: 'Explore World War II firearms including handguns, submachine guns, rifles, sniper rifles, and machine guns.',
};

export default function GunsPage() {
  const guns = getWeaponsByCategory('guns');

  return (
    <WeaponGrid
      weapons={guns}
      category="guns"
      title="GUNS"
      subtitle="HANDGUNS, SMGS, RIFLES, SNIPERS, AND MACHINE GUNS"
    />
  );
}
