import { getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';
import { buildCategoryItemListJsonLd, buildCategoryMetadata } from '@/lib/seo';

export const metadata = buildCategoryMetadata(
  'explosives',
  'Explosives - Weapons of World War 2',
  'Explore World War II explosive ordnance including grenades, anti-tank charges, mines, demolition charges, and incendiaries.',
);

export default function ExplosivesPage() {
  const explosives = getWeaponsByCategory('explosives');
  const itemListJsonLd = buildCategoryItemListJsonLd('explosives', explosives);

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <WeaponGrid
        weapons={explosives}
        category="explosives"
        title="EXPLOSIVES"
        subtitle="GRENADES, MINES, DEMOLITION CHARGES, AND INCENDIARIES"
      />
    </>
  );
}
