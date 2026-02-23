import {
  ExplosiveSpecs,
  GunSpecs,
  NavalSpecs,
  PlaneSpecs,
  TankSpecs,
  Weapon,
} from '@/lib/types/weapon';

export function buildComparisonSpecRows(weapon: Weapon): [string, string][] {
  if (weapon.category === 'guns') {
    const s = weapon.specs as GunSpecs;
    return [
      ['Caliber', s.caliber],
      ['Action', s.action],
      ['Rate of Fire', s.rateOfFire > 0 ? `${s.rateOfFire} rpm` : 'Semi-auto / deliberate fire'],
      ['Muzzle Velocity', `${s.muzzleVelocity} m/s`],
      ['Effective Range', `${s.effectiveRange} m`],
      ['Magazine', `${s.magazineCapacity} rounds`],
      ['Weight', `${s.weight} kg`],
    ];
  }

  if (weapon.category === 'tanks') {
    const s = weapon.specs as TankSpecs;
    return [
      ['Crew', `${s.crew}`],
      ['Weight', `${s.weight} t`],
      ['Main Armament', s.mainArmament],
      ['Armor (front)', `${s.armor.front} mm`],
      ['Max Speed', `${s.maxSpeed} km/h`],
      ['Range', `${s.range} km`],
      ['Production', `${s.productionCount.toLocaleString()} built`],
    ];
  }

  if (weapon.category === 'planes') {
    const s = weapon.specs as PlaneSpecs;
    return [
      ['Crew', `${s.crew}`],
      ['Max Speed', `${s.maxSpeed} km/h`],
      ['Range', `${s.range} km`],
      ['Ceiling', `${s.ceiling} m`],
      ['Engine', s.engine],
      ['Armament', s.armament.slice(0, 2).join(' • ')],
      ['Production', `${s.productionCount.toLocaleString()} built`],
    ];
  }

  if (weapon.category === 'naval') {
    const s = weapon.specs as NavalSpecs;
    return [
      ['Displacement', `${s.displacement.toLocaleString()} t`],
      ['Length', `${s.length} m`],
      ['Top Speed', `${s.speed} knots`],
      ['Range', `${s.range.toLocaleString()} nmi`],
      ['Crew', `${s.crew.toLocaleString()}`],
      ['Main Armament', s.armament.slice(0, 2).join(' • ')],
      ['Armor', `Belt ${s.armor.belt} mm • Deck ${s.armor.deck} mm`],
    ];
  }

  const s = weapon.specs as ExplosiveSpecs;
  return [
    ['Explosive Type', s.explosiveType],
    ['Fuzing', s.fuzing],
    ['Filling', s.filling],
    ['Weight', `${s.weight} kg`],
    ['Effective Range', s.effectiveRange ? `${s.effectiveRange} m` : 'Context dependent'],
    ['Blast Radius', s.blastRadius ? `${s.blastRadius} m` : 'Context dependent'],
  ];
}
