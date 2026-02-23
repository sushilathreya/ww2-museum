'use client';

import { useEffect, useState } from 'react';
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

const WeaponViewer = dynamic(
  () => import('@/components/3d/WeaponViewer').then((m) => m.WeaponViewer),
  { ssr: false, loading: () => <div className="w-full h-[300px] sm:h-[500px] bg-gray-900 rounded-lg animate-pulse" /> },
);

interface InternalLink {
  href: string;
  label: string;
  note?: string;
}

interface WeaponDetailProps {
  weapon: Weapon;
  relatedLinks?: InternalLink[];
  comparisonLinks?: InternalLink[];
  battleLinks?: InternalLink[];
  countryCategoryLink?: InternalLink;
}

interface BriefingCard {
  title: string;
  body: string;
}

export function WeaponDetail({
  weapon,
  relatedLinks = [],
  comparisonLinks = [],
  battleLinks = [],
  countryCategoryLink,
}: WeaponDetailProps) {
  const country = COUNTRIES[weapon.country];
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const briefing = buildCuratorBriefing(weapon);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLightboxOpen]);

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
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="w-full text-left rounded-lg overflow-hidden border border-gray-800 bg-black/30 hover:border-military-gold/40 transition-colors cursor-zoom-in"
          aria-label={`Open full image of ${weapon.name}`}
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9]">
            <Image
              src={assetPath(weapon.imageUrl)}
              alt={weapon.name}
              fill
              className="object-contain p-2 sm:p-4"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            <p className="absolute bottom-2 right-3 text-[10px] sm:text-xs font-mono text-gray-300">
              CLICK TO EXPAND
            </p>
          </div>
        </button>
      </div>

      {weapon.model3dUrl && (
        <div className="mb-10">
          <WeaponViewer modelUrl={weapon.model3dUrl} weaponName={weapon.name} />
        </div>
      )}

      {/* Overview */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          OVERVIEW
        </h2>
        <p className="text-gray-300 leading-relaxed">{weapon.history.overview}</p>
      </section>

      {/* Curator Briefing */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
          HISTORIAN&apos;S COMMENTARY
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {briefing.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-gray-800 bg-gray-900/45 p-4 sm:p-5 min-h-[168px]"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold mb-3">{card.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{card.body}</p>
            </article>
          ))}
        </div>
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

      {(countryCategoryLink || relatedLinks.length > 0 || comparisonLinks.length > 0 || battleLinks.length > 0) && (
        <section className="mb-10">
          <h2 className="font-display text-2xl text-military-gold tracking-wider mb-4 stencil-text">
            CONTINUE RESEARCH
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {countryCategoryLink && (
              <article className="rounded-lg border border-gray-800 bg-gray-900/45 p-4 sm:p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold mb-3">Country + Class</h3>
                <Link href={countryCategoryLink.href} className="text-sm text-white hover:text-military-gold transition-colors">
                  {countryCategoryLink.label}
                </Link>
                {countryCategoryLink.note && <p className="mt-2 text-xs text-gray-500">{countryCategoryLink.note}</p>}
              </article>
            )}

            {relatedLinks.length > 0 && (
              <article className="rounded-lg border border-gray-800 bg-gray-900/45 p-4 sm:p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold mb-3">Related Records</h3>
                <ul className="space-y-2">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white hover:text-military-gold transition-colors">
                        {link.label}
                      </Link>
                      {link.note && <p className="text-xs text-gray-500 mt-1">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {comparisonLinks.length > 0 && (
              <article className="rounded-lg border border-gray-800 bg-gray-900/45 p-4 sm:p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold mb-3">Comparisons</h3>
                <ul className="space-y-2">
                  {comparisonLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white hover:text-military-gold transition-colors">
                        {link.label}
                      </Link>
                      {link.note && <p className="text-xs text-gray-500 mt-1">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {battleLinks.length > 0 && (
              <article className="rounded-lg border border-gray-800 bg-gray-900/45 p-4 sm:p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-military-gold mb-3">Battle Context</h3>
                <ul className="space-y-2">
                  {battleLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white hover:text-military-gold transition-colors">
                        {link.label}
                      </Link>
                      {link.note && <p className="text-xs text-gray-500 mt-1">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </section>
      )}

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute z-20 top-[max(env(safe-area-inset-top),0.75rem)] right-[max(env(safe-area-inset-right),0.75rem)] sm:top-4 sm:right-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-gray-500 bg-black/70 px-4 py-2 text-sm sm:text-xs font-mono uppercase text-gray-200 shadow-md transition-colors hover:border-military-gold hover:text-military-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Close full image"
          >
            Close
          </button>
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={assetPath(weapon.imageUrl)}
              alt={weapon.name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
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

function buildCuratorBriefing(weapon: Weapon): BriefingCard[] {
  const operator = COUNTRIES[weapon.country].name;
  const serviceWindow = weapon.yearRetired
    ? `between ${weapon.yearIntroduced} and ${weapon.yearRetired}`
    : `from ${weapon.yearIntroduced} onward`;
  const role = weapon.subcategory.replace('-', ' ');

  if (weapon.category === 'guns') {
    const s = weapon.specs as GunSpecs;
    const fireTempo =
      s.rateOfFire > 0
        ? `Crews could sustain roughly ${s.rateOfFire} rounds per minute in trained hands`
        : 'It was intended for deliberate semi-automatic fire rather than sustained automatic bursts';
    const doctrineNote =
      weapon.subcategory === 'sniper'
        ? 'In practice it became a weapon of patience, observation, and single decisive shots.'
        : weapon.subcategory === 'machinegun'
          ? 'In practice it served as the heartbeat of the squad, pinning the enemy while others moved.'
          : weapon.subcategory === 'smg'
            ? 'In practice it thrived in alleys, trenches, and ruined interiors where seconds decided survival.'
            : weapon.subcategory === 'handgun'
              ? 'In practice it was trusted as a last line of defense by officers, crews, and specialists.'
              : 'In practice it was judged by reliability under mud, cold, and long marches more than by range-table theory.';
    const verdict =
      s.effectiveRange >= 700
        ? 'Historians usually remember this type for extending lethal precision deeper into the battlefield than most contemporaries.'
        : s.rateOfFire >= 700
          ? 'Historians usually remember this type for the shock of close-range fire volume and morale impact.'
          : 'Historians usually remember this type as a pragmatic wartime tool: not glamorous, but consistently useful where battles were actually decided.';

    return [
      {
        title: 'Before the Storm',
        body: `Introduced ${serviceWindow}, ${weapon.name} was built by ${weapon.manufacturer} for ${operator} forces as a ${role} for total war armies.`,
      },
      {
        title: 'In the Field',
        body: `Chambered in ${s.caliber} and operating by ${s.action.toLowerCase()}, it offered an effective reach of about ${s.effectiveRange} meters. ${fireTempo}, carried in a ${s.weight} kg frame with a ${s.magazineCapacity}-round magazine.`,
      },
      {
        title: "Historian's Note",
        body: `${doctrineNote} ${verdict}`,
      },
    ];
  }

  if (weapon.category === 'tanks') {
    const s = weapon.specs as TankSpecs;
    const doctrineNote =
      weapon.subcategory === 'heavy-tank'
        ? 'On the battlefield it was expected to break prepared lines and survive punishment that would stop lighter vehicles.'
        : weapon.subcategory === 'tank-destroyer'
          ? 'On the battlefield it was most dangerous when waiting in depth for enemy armor to expose itself.'
          : 'On the battlefield it worked best when armor, infantry, artillery, and recovery units moved as one system.';
    const verdict =
      s.armor.front >= 100
        ? 'Its legacy is tied to survivability at the point of contact, though weight and logistics always set hard limits.'
        : s.maxSpeed >= 45
          ? 'Its legacy is tied to tempo: it could exploit openings quickly, but only while fuel and maintenance kept pace.'
          : 'Its legacy is tied to balance rather than extremes, reflecting the constant wartime compromise between protection, firepower, and movement.';

    return [
      {
        title: 'Before the Storm',
        body: `Introduced ${serviceWindow}, ${weapon.name} entered service as a ${role} in ${operator} armored formations, built by ${weapon.manufacturer}.`,
      },
      {
        title: 'In the Field',
        body: `With ${s.mainArmament}, armor up to ${s.armor.front} mm on the front, and a top speed around ${s.maxSpeed} km/h, this ${s.weight}-ton machine carried both promise and mechanical burden. About ${s.productionCount.toLocaleString()} were produced for a war that demanded constant replacement.`,
      },
      {
        title: "Historian's Note",
        body: `${doctrineNote} ${verdict}`,
      },
    ];
  }

  if (weapon.category === 'planes') {
    const s = weapon.specs as PlaneSpecs;
    const doctrineNote =
      weapon.subcategory === 'fighter'
        ? 'In combat it lived and died by pilot skill, climb timing, and who saw whom first.'
        : weapon.subcategory === 'bomber'
          ? 'In combat it represented industrial war in the sky, where endurance, navigation, and crew cohesion mattered as much as payload.'
          : 'In combat it was the connective tissue of campaigns, carrying men and materiel where rail and road could not.';
    const verdict =
      s.maxSpeed >= 600
        ? 'Its reputation rests on speed and initiative, but sortie generation and maintenance discipline determined real strategic effect.'
        : s.range >= 2500
          ? 'Its reputation rests on reach, allowing commanders to think in theater-scale arcs rather than local fronts.'
          : 'Its reputation rests on dependable service across long campaigns, often without headline glamour.';

    return [
      {
        title: 'Before the Storm',
        body: `Introduced ${serviceWindow}, ${weapon.name} reflected ${operator} priorities in air war and was produced by ${weapon.manufacturer}.`,
      },
      {
        title: 'In the Field',
        body: `At roughly ${s.maxSpeed} km/h with a range near ${s.range} km and a ceiling around ${s.ceiling.toLocaleString()} meters, its combat envelope was shaped by engine performance, weather, and pilot stamina. Wartime industry turned out around ${s.productionCount.toLocaleString()} airframes.`,
      },
      {
        title: "Historian's Note",
        body: `${doctrineNote} ${verdict}`,
      },
    ];
  }

  if (weapon.category === 'naval') {
    const s = weapon.specs as NavalSpecs;
    const doctrineNote =
      weapon.subcategory === 'carrier'
        ? 'At sea, its striking arm was the air group, and command decisions were made in reconnaissance cycles measured in minutes.'
        : weapon.subcategory === 'submarine'
          ? 'At sea, it fought mostly unseen, turning trade routes into battlefields of attrition and uncertainty.'
          : weapon.subcategory === 'destroyer'
            ? 'At sea, it was often the fleet\'s workhorse, screening heavier ships and hunting submarines under relentless tempo.'
            : 'At sea, it embodied concentrated naval power, but only within the wider choreography of escorts, scouting, and logistics.';
    const verdict =
      s.range >= 10000
        ? 'Its long-range endurance shaped operational planning far beyond any single gunnery duel.'
        : s.speed >= 30
          ? 'Its tactical value came from speed and responsiveness, especially in fast-moving task force actions.'
          : 'Its record shows that naval outcomes depended on organization and readiness at least as much as hull statistics.';

    return [
      {
        title: 'Before the Storm',
        body: `Introduced ${serviceWindow}, ${weapon.name} served ${operator} naval strategy as a ${role}, with construction tied to the industrial capacity of ${weapon.manufacturer}.`,
      },
      {
        title: 'In the Field',
        body: `Displacing around ${s.displacement.toLocaleString()} tons with a top speed of ${s.speed} knots and range near ${s.range.toLocaleString()} nautical miles, it was both a combat platform and a floating logistics problem. Manning levels around ${s.crew.toLocaleString()} sailors defined daily operating reality as much as armament did.`,
      },
      {
        title: "Historian's Note",
        body: `${doctrineNote} ${verdict}`,
      },
    ];
  }

  const s = weapon.specs as ExplosiveSpecs;
  const doctrineNote =
    weapon.subcategory === 'mine'
      ? 'On the ground, it reshaped movement itself, turning roads, fields, and choke points into calculated hazards.'
      : weapon.subcategory === 'demolition-charge'
        ? 'On the ground, it was an engineer\'s instrument for breaching and sabotage under fire.'
        : weapon.subcategory === 'smoke-grenade'
          ? 'On the ground, it created moments of blindness that infantry used to survive, regroup, or advance.'
          : weapon.subcategory === 'incendiary'
            ? 'On the ground, it was used to ignite supply, shelter, and morale in equal measure.'
            : 'On the ground, it gave infantry an immediate burst of shock effect in close-quarter fighting.';
  const verdict =
    typeof s.blastRadius === 'number' && s.blastRadius >= 10
      ? 'Its historical value came from local overmatch, but only when placement and timing were right.'
      : s.explosiveType.toLowerCase().includes('smoke')
        ? 'Its historical value came from control of sight and tempo, not raw destructive power.'
        : 'Its historical value came from practical battlefield utility rather than dramatic technical scale.';

  return [
    {
      title: 'Before the Storm',
      body: `Introduced ${serviceWindow}, ${weapon.name} was fielded by ${operator} forces as a ${role} instrument for close combat and battlefield shaping.`,
    },
    {
      title: 'In the Field',
      body: `Loaded with ${s.explosiveType} filling and ${s.fuzing.toLowerCase()} fuzing, this ${s.weight} kg munition depended on nerve and timing more than machinery. Its effective use envelope${s.effectiveRange ? ` reached about ${s.effectiveRange} meters` : ' was typically close placement'}${s.blastRadius ? `, with effects spreading near ${s.blastRadius} meters` : ''}.`,
    },
    {
      title: "Historian's Note",
      body: `${doctrineNote} ${verdict}`,
    },
  ];
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
