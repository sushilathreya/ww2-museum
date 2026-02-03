import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedWeapons, weapons } from '@/lib/data/weapons';
import { CATEGORY_CONFIG, WeaponCategory, COUNTRIES } from '@/lib/types/weapon';
import { assetPath } from '@/lib/utils';

const categoryIcons: Record<WeaponCategory, string> = {
  guns: '🔫',
  tanks: '🪖',
  planes: '✈️',
  naval: '⚓',
};

export default function HomePage() {
  const featured = getFeaturedWeapons();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <p className="text-military-gold font-mono text-sm tracking-[0.3em] mb-4">
            INTERACTIVE MUSEUM
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-white tracking-wider stencil-text leading-none">
            WW2
            <br />
            ARSENAL
          </h1>
          <p className="text-gray-400 max-w-lg mt-6 leading-relaxed">
            Explore the weapons that shaped World War II. From iconic firearms to
            legendary tanks, fighter planes, and warships — each with interactive 3D
            models and detailed historical data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/guns"
              className="px-6 py-3 bg-military-gold text-black font-mono text-sm uppercase tracking-wider rounded hover:bg-military-gold-light transition-colors"
            >
              Explore Arsenal
            </Link>
            <Link
              href="#categories"
              className="px-6 py-3 border border-gray-700 text-gray-400 font-mono text-sm uppercase tracking-wider rounded hover:border-military-gold hover:text-military-gold transition-colors"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 sm:gap-12 mt-12 sm:mt-16 pt-8 border-t border-gray-800/50">
            <div>
              <p className="font-display text-3xl text-military-gold">{weapons.length}</p>
              <p className="text-xs font-mono text-gray-600 mt-1">WEAPONS</p>
            </div>
            <div>
              <p className="font-display text-3xl text-military-gold">
                {Object.keys(CATEGORY_CONFIG).length}
              </p>
              <p className="text-xs font-mono text-gray-600 mt-1">CATEGORIES</p>
            </div>
            <div>
              <p className="font-display text-3xl text-military-gold">6</p>
              <p className="text-xs font-mono text-gray-600 mt-1">NATIONS</p>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-military-gold/20 to-transparent" />
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="font-display text-3xl text-white tracking-wider stencil-text mb-2">
          CATEGORIES
        </h2>
        <p className="text-gray-600 font-mono text-sm mb-10">
          SELECT A CATEGORY TO EXPLORE
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {(Object.keys(CATEGORY_CONFIG) as WeaponCategory[]).map((key) => {
            const config = CATEGORY_CONFIG[key];
            const count = weapons.filter((w) => w.category === key).length;

            return (
              <Link
                key={key}
                href={`/${key}`}
                className="group p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-military-gold/50 transition-all weapon-card-glow"
              >
                <span className="text-3xl">{categoryIcons[key]}</span>
                <h3 className="font-display text-2xl text-white mt-4 tracking-wider group-hover:text-military-gold transition-colors">
                  {config.label}
                </h3>
                <p className="text-xs text-gray-600 font-mono mt-2">
                  {count} RECORDS
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {config.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.slug}
                      className="text-[10px] font-mono text-gray-600 bg-gray-800 px-2 py-0.5 rounded"
                    >
                      {sub.label}
                    </span>
                  ))}
                  {config.subcategories.length > 3 && (
                    <span className="text-[10px] font-mono text-gray-600 bg-gray-800 px-2 py-0.5 rounded">
                      +{config.subcategories.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Weapons */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-gray-800/50">
        <h2 className="font-display text-3xl text-white tracking-wider stencil-text mb-2">
          FEATURED
        </h2>
        <p className="text-gray-600 font-mono text-sm mb-10">
          ICONIC WEAPONS OF WORLD WAR II
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featured.slice(0, 6).map((weapon) => {
            const country = COUNTRIES[weapon.country];
            return (
              <Link
                key={weapon.id}
                href={`/${weapon.category}/${weapon.slug}`}
                className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-military-gold/50 transition-all weapon-card-glow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={assetPath(weapon.imageUrl)}
                    alt={weapon.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-[10px] font-mono uppercase bg-black/70 text-military-gold rounded backdrop-blur-sm">
                      {weapon.subcategory.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 text-xl drop-shadow-lg" title={country.name}>
                    {country.flag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-white tracking-wider group-hover:text-military-gold transition-colors">
                    {weapon.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-mono mt-1">
                    {weapon.manufacturer} &middot; {weapon.yearIntroduced}
                  </p>
                  <p className="text-sm text-gray-400 mt-3 line-clamp-2">
                    {weapon.history.overview}
                  </p>
                  <p className="text-xs text-military-gold/60 font-mono mt-4 group-hover:text-military-gold transition-colors">
                    VIEW DETAILS &rarr;
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <p className="font-display text-lg text-military-gold tracking-wider">
              WW2 ARSENAL
            </p>
            <p className="text-xs text-gray-600 font-mono mt-1">
              EDUCATIONAL PURPOSES ONLY
            </p>
          </div>
          <p className="text-xs text-gray-700 font-mono">WWII: 1939-1945</p>
        </div>
      </footer>
    </div>
  );
}
