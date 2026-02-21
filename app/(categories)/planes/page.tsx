import { getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';
import { buildCategoryItemListJsonLd, buildCategoryMetadata } from '@/lib/seo';

export const metadata = buildCategoryMetadata(
  'planes',
  'Planes - Weapons of World War 2',
  'Explore World War II aircraft including fighters, bombers, and transport planes.',
);

export default function PlanesPage() {
  const planes = getWeaponsByCategory('planes');
  const itemListJsonLd = buildCategoryItemListJsonLd('planes', planes);

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <WeaponGrid
        weapons={planes}
        category="planes"
        title="PLANES"
        subtitle="FIGHTERS, BOMBERS, AND TRANSPORT AIRCRAFT"
      />
    </>
  );
}
