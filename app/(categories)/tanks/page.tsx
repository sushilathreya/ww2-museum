import { getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';
import { buildCategoryItemListJsonLd, buildCategoryMetadata } from '@/lib/seo';

export const metadata = buildCategoryMetadata(
  'tanks',
  'Tanks - Weapons of World War 2',
  'Explore World War II tanks including light, medium, heavy tanks, and tank destroyers.',
);

export default function TanksPage() {
  const tanks = getWeaponsByCategory('tanks');
  const itemListJsonLd = buildCategoryItemListJsonLd('tanks', tanks);

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <WeaponGrid
        weapons={tanks}
        category="tanks"
        title="TANKS"
        subtitle="LIGHT, MEDIUM, HEAVY TANKS, AND TANK DESTROYERS"
      />
    </>
  );
}
