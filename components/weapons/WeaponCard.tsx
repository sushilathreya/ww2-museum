'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Weapon, COUNTRIES } from '@/lib/types/weapon';
import { cn } from '@/lib/utils';

interface WeaponCardProps {
  weapon: Weapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const country = COUNTRIES[weapon.country];

  return (
    <Link href={`/${weapon.category}/${weapon.slug}`}>
      <article
        className={cn(
          'group relative bg-gray-900/80 border border-gray-800 rounded-lg',
          'overflow-hidden transition-all duration-300 weapon-card-glow',
          'hover:border-military-gold/50 hover:scale-[1.02]',
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Area */}
        <div className="aspect-[4/3] relative bg-gradient-to-b from-gray-800/50 to-gray-900 overflow-hidden">
          {/* Weapon Image */}
          <Image
            src={weapon.imageUrl}
            alt={weapon.name}
            fill
            className={cn(
              'object-cover transition-transform duration-700',
              isHovered ? 'scale-110' : 'scale-100',
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Country Flag */}
          <div className="absolute top-3 right-3 text-xl drop-shadow-lg" title={country.name}>
            {country.flag}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/70 text-military-gold border border-military-gold/30 rounded backdrop-blur-sm">
              {weapon.subcategory.replace('-', ' ')}
            </span>
          </div>

          {/* Year */}
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-mono text-gray-300 drop-shadow">
              {weapon.yearIntroduced}
            </span>
          </div>

          {/* Hover Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-military-gold/10 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>

        {/* Info Section */}
        <div className="p-4 border-t border-gray-800/50">
          <h3 className="font-display text-lg text-white group-hover:text-military-gold transition-colors tracking-wide">
            {weapon.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-mono truncate">
            {weapon.designation}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-600 font-mono">{weapon.manufacturer}</span>
            <span className="text-xs text-gray-600">{country.name}</span>
          </div>
        </div>

        {/* Click instruction */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-military-gold/10 to-transparent',
            'flex items-end justify-center pb-14 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span className="text-military-gold/80 font-mono text-[10px] tracking-widest uppercase">
            View Details
          </span>
        </div>
      </article>
    </Link>
  );
}

