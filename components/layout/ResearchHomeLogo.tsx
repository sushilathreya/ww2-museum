import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ResearchHomeLogoProps {
  className?: string;
}

export function ResearchHomeLogo({ className }: ResearchHomeLogoProps) {
  return (
    <Link href="/guns" className={cn('group inline-flex flex-col', className)}>
      <span className="font-display text-2xl text-military-gold tracking-wider stencil-text sm:text-3xl">
        WEAPONS OF WORLD WAR 2
      </span>
      <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 transition-colors group-hover:text-gray-300">
        HOME ARCHIVE
      </span>
    </Link>
  );
}
