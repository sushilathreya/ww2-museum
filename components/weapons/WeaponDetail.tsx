'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  Weapon,
  COUNTRIES,
  GunSpecs,
  TankSpecs,
  PlaneSpecs,
  NavalSpecs,
  ExplosiveSpecs,
} from '@/lib/types/weapon';
import { assetPath } from '@/lib/utils';

const WeaponViewerPlaceholder = dynamic(
  () => import('@/components/3d/WeaponViewer').then((m) => m.WeaponViewerPlaceholder),
  { ssr: false, loading: () => <div className="w-full h-[250px] sm:h-[400px] bg-gray-900 rounded-lg animate-pulse" /> },
);

const WeaponViewer = dynamic(
  () => import('@/components/3d/WeaponViewer').then((m) => m.WeaponViewer),
  { ssr: false, loading: () => <div className="w-full h-[300px] sm:h-[500px] bg-gray-900 rounded-lg animate-pulse" /> },
);

interface WeaponDetailProps {
  weapon: Weapon;
}

export function WeaponDetail({ weapon }: WeaponDetailProps) {
  const country = COUNTRIES[weapon.country];

  return (
    <div className="max-w-5xl">
      {/* Back Link */}
      <Link
        href={`/${weapon.category}`}
        className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-military-gold transition-colors mb-6"
      >
        <span>&larr;</span>
        <span>BACK TO {weapon.category.toUpperCase()}</span>
      </Link>

      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <span className="text-2xl sm:text-3xl" title={country.name}>
            {country.flag}
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl text-white tracking-wider stencil-text">
              {weapon.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-500 mt-1 truncate">{weapon.designation}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
          <span className="px-3 py-1 text-xs font-mono uppercase bg-military-gold/15 text-military-gold border border-military-gold/30 rounded">
            {weapon.subcategory.replace('-', ' ')}
          </span>
          <span className="text-sm text-gray-500 font-mono">
            {weapon.manufacturer} &middot; {weapon.yearIntroduced}
            {weapon.yearRetired ? `–${weapon.yearRetired}` : ''}
          </span>
        </div>
      </div>

      {/* Weapon Image */}
      <div className="mb-6 relative h-[200px] sm:h-[280px] md:h-[350px] rounded-lg overflow-hidden">
        <Image
          src={assetPath(weapon.imageUrl)}
          alt={weapon.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* 3D Viewer */}
      <div className="mb-10">
        {weapon.model3dUrl ? (
          <WeaponViewer modelUrl={weapon.model3dUrl} weaponName={weapon.name} />
        ) : (
          <WeaponViewerPlaceholder weaponName={weapon.name} />
        )}
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          OVERVIEW
        </h2>
        <p className="text-gray-300 leading-relaxed">{weapon.history.overview}</p>
      </section>

      {/* Specs */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          SPECIFICATIONS
        </h2>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
          <SpecsTable weapon={weapon} />
        </div>
      </section>

      {/* Development */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          DEVELOPMENT
        </h2>
        <p className="text-gray-300 leading-relaxed">{weapon.history.development}</p>
      </section>

      {/* Combat History */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          COMBAT HISTORY
        </h2>
        <p className="text-gray-300 leading-relaxed">{weapon.history.combatHistory}</p>
      </section>

      {/* Notable Uses */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          NOTABLE USES
        </h2>
        <ul className="space-y-3">
          {weapon.history.notableUses.map((use, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-military-gold font-mono text-xs mt-1">
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <span className="text-gray-300">{use}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SpecsTable({ weapon }: { weapon: Weapon }) {
  const rows = getSpecRows(weapon);

  return (
    <table className="w-full">
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={label} className={i % 2 === 0 ? 'bg-gray-800/30' : ''}>
            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs font-mono text-gray-500 uppercase w-1/3">
              {label}
            </td>
            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-300 font-mono">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getSpecRows(weapon: Weapon): [string, string][] {
  const specs = weapon.specs;

  if (weapon.category === 'guns') {
    const s = specs as GunSpecs;
    return [
      ['Caliber', s.caliber],
      ['Action', s.action],
      ['Rate of Fire', s.rateOfFire > 0 ? `${s.rateOfFire} rpm` : 'Semi-auto'],
      ['Muzzle Velocity', `${s.muzzleVelocity} m/s`],
      ['Effective Range', `${s.effectiveRange} m`],
      ['Magazine', `${s.magazineCapacity} rounds`],
      ['Weight', `${s.weight} kg`],
      ['Length', `${s.length} mm`],
    ];
  }

  if (weapon.category === 'tanks') {
    const s = specs as TankSpecs;
    return [
      ['Crew', `${s.crew}`],
      ['Weight', `${s.weight} tonnes`],
      ['Main Armament', s.mainArmament],
      ['Armor (Front)', `${s.armor.front} mm`],
      ['Armor (Side)', `${s.armor.side} mm`],
      ['Armor (Rear)', `${s.armor.rear} mm`],
      ['Engine', s.engine],
      ['Max Speed', `${s.maxSpeed} km/h`],
      ['Range', `${s.range} km`],
      ['Production', s.productionCount.toLocaleString()],
    ];
  }

  if (weapon.category === 'planes') {
    const s = specs as PlaneSpecs;
    return [
      ['Crew', `${s.crew}`],
      ['Wingspan', `${s.wingspan} m`],
      ['Max Speed', `${s.maxSpeed} km/h`],
      ['Range', `${s.range} km`],
      ['Service Ceiling', `${s.ceiling.toLocaleString()} m`],
      ['Armament', s.armament.join(', ')],
      ['Engine', s.engine],
      ['Production', s.productionCount.toLocaleString()],
    ];
  }

  if (weapon.category === 'naval') {
    const s = specs as NavalSpecs;
    return [
      ['Displacement', `${s.displacement.toLocaleString()} tonnes`],
      ['Length', `${s.length} m`],
      ['Speed', `${s.speed} knots`],
      ['Range', `${s.range.toLocaleString()} nmi`],
      ['Crew', s.crew.toLocaleString()],
      ['Armament', s.armament.join(', ')],
      ['Belt Armor', `${s.armor.belt} mm`],
      ['Deck Armor', `${s.armor.deck} mm`],
    ];
  }

  if (weapon.category === 'explosives') {
    const s = specs as ExplosiveSpecs;
    return [
      ['Type', s.explosiveType],
      ['Fuzing', s.fuzing],
      ['Filling', s.filling],
      ['Weight', `${s.weight} kg`],
      ['Effective Range', s.effectiveRange ? `${s.effectiveRange} m` : 'Contact / Placement'],
      ['Blast Radius', s.blastRadius ? `${s.blastRadius} m` : 'Varies by use'],
    ];
  }

  return [];
}
