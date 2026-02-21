import { getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';
import { buildCategoryItemListJsonLd, buildCategoryMetadata } from '@/lib/seo';

export const metadata = buildCategoryMetadata(
  'naval',
  'Naval - Weapons of World War 2',
  'Explore World War II naval vessels including battleships, carriers, submarines, and destroyers.',
);

export default function NavalPage() {
  const naval = getWeaponsByCategory('naval');
  const itemListJsonLd = buildCategoryItemListJsonLd('naval', naval);

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <WeaponGrid
        weapons={naval}
        category="naval"
        title="NAVAL"
        subtitle="BATTLESHIPS, CARRIERS, SUBMARINES, AND DESTROYERS"
      />
    </>
  );
}
