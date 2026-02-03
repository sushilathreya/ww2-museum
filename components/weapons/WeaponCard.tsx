'use client';

import { useState } from 'react';
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
        {/* 3D Preview / Image Area */}
        <div className="aspect-[4/3] relative bg-gradient-to-b from-gray-800/50 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Wireframe placeholder that rotates */}
          <div
            className={cn(
              'transition-transform duration-[2000ms] ease-linear',
              isHovered ? 'rotate-[30deg] scale-110' : 'rotate-0 scale-100',
            )}
          >
            <WeaponSilhouette category={weapon.category} />
          </div>

          {/* Country Flag */}
          <div className="absolute top-3 right-3 text-xl" title={country.name}>
            {country.flag}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/70 text-military-gold border border-military-gold/30 rounded">
              {weapon.subcategory.replace('-', ' ')}
            </span>
          </div>

          {/* Year */}
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-mono text-gray-500">
              {weapon.yearIntroduced}
            </span>
          </div>

          {/* Hover Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-military-gold/5 transition-opacity duration-300',
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

function WeaponSilhouette({ category }: { category: string }) {
  // Simple SVG silhouettes for each category
  const size = 120;

  switch (category) {
    case 'guns':
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" className="text-military-gold/20">
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M15 55 L75 55 L80 50 L105 50 L105 60 L80 60 L75 65 L65 65 L65 80 L55 80 L55 65 L15 65 Z" />
            <rect x="85" y="48" width="5" height="14" rx="1" />
            <line x1="30" y1="55" x2="30" y2="65" />
            <line x1="45" y1="55" x2="45" y2="65" />
          </g>
        </svg>
      );
    case 'tanks':
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" className="text-military-gold/20">
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <rect x="20" y="60" width="80" height="25" rx="3" />
            <rect x="35" y="45" width="40" height="18" rx="2" />
            <line x1="75" y1="52" x2="105" y2="48" strokeWidth="3" />
            <ellipse cx="35" cy="88" rx="8" ry="6" />
            <ellipse cx="60" cy="88" rx="8" ry="6" />
            <ellipse cx="85" cy="88" rx="8" ry="6" />
            <path d="M25 88 L95 88" />
          </g>
        </svg>
      );
    case 'planes':
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" className="text-military-gold/20">
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <ellipse cx="60" cy="60" rx="8" ry="35" />
            <path d="M52 50 L10 60 L52 65" />
            <path d="M68 50 L110 60 L68 65" />
            <path d="M55 88 L45 95 L65 95 Z" />
            <line x1="60" y1="25" x2="60" y2="95" strokeWidth="0.5" />
          </g>
        </svg>
      );
    case 'naval':
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" className="text-military-gold/20">
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M15 65 L25 75 L95 75 L105 65 Z" />
            <rect x="40" y="55" width="30" height="12" rx="1" />
            <rect x="50" y="48" width="10" height="8" rx="1" />
            <line x1="55" y1="35" x2="55" y2="48" />
            <line x1="75" y1="58" x2="85" y2="55" strokeWidth="2" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
