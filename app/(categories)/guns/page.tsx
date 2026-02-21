import { getWeaponsByCategory } from '@/lib/data/weapons';
import { JsonLd } from '@/components/seo/JsonLd';
import { WeaponGrid } from '@/components/weapons/WeaponGrid';
import { buildCategoryItemListJsonLd, buildCategoryMetadata } from '@/lib/seo';

export const metadata = buildCategoryMetadata(
  'guns',
  'Guns - Weapons of World War 2',
  'Explore World War II firearms including handguns, submachine guns, rifles, sniper rifles, and machine guns.',
);

export default function GunsPage() {
  const guns = getWeaponsByCategory('guns');
  const itemListJsonLd = buildCategoryItemListJsonLd('guns', guns);

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <WeaponGrid
        weapons={guns}
        category="guns"
        title="GUNS"
        subtitle="HANDGUNS, SMGS, RIFLES, SNIPERS, AND MACHINE GUNS"
      />
    </>
  );
}
