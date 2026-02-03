import { Weapon, WeaponCategory, WeaponSubcategory } from '@/lib/types/weapon';

export const weapons: Weapon[] = [
  // ═══════════════════════════════════════
  // GUNS
  // ═══════════════════════════════════════
  {
    id: 'm1-garand',
    slug: 'm1-garand',
    name: 'M1 Garand',
    designation: 'United States Rifle, Caliber .30, M1',
    category: 'guns',
    subcategory: 'rifle',
    country: 'US',
    manufacturer: 'Springfield Armory',
    yearIntroduced: 1936,
    yearRetired: 1957,
    imageUrl: '/weapons/m1-garand.jpg',
    specs: {
      caliber: '.30-06 Springfield (7.62×63mm)',
      action: 'Gas-operated, rotating bolt',
      rateOfFire: 40,
      muzzleVelocity: 853,
      effectiveRange: 457,
      magazineCapacity: 8,
      weight: 4.31,
      length: 1107,
    },
    history: {
      overview:
        'The M1 Garand was the first standard-issue semi-automatic military rifle. General George S. Patton called it "the greatest battle implement ever devised."',
      development:
        'Designed by Canadian-American engineer John Garand while working at Springfield Armory. Development began in the 1920s, and the rifle was officially adopted in 1936 after extensive testing and competition against other designs.',
      combatHistory:
        'The M1 Garand served as the standard U.S. service rifle during World War II and the Korean War. It gave American infantrymen a significant advantage over Axis soldiers armed with bolt-action rifles, as it could deliver accurate semi-automatic fire. The rifle saw action in every theater of WW2, from North Africa to the Pacific Islands.',
      notableUses: [
        'Standard issue U.S. infantry rifle throughout WW2',
        'D-Day landings at Normandy (June 6, 1944)',
        'Battle of the Bulge (December 1944)',
        'Island-hopping campaigns in the Pacific',
      ],
    },
    featured: true,
  },
  {
    id: 'thompson-m1a1',
    slug: 'thompson-m1a1',
    name: 'Thompson M1A1',
    designation: 'United States Submachine Gun, Caliber .45, M1A1',
    category: 'guns',
    subcategory: 'smg',
    country: 'US',
    manufacturer: 'Auto-Ordnance / Savage Arms',
    yearIntroduced: 1942,
    yearRetired: 1971,
    imageUrl: '/weapons/thompson.jpg',
    specs: {
      caliber: '.45 ACP (11.43×23mm)',
      action: 'Blowback, open bolt',
      rateOfFire: 700,
      muzzleVelocity: 285,
      effectiveRange: 150,
      magazineCapacity: 30,
      weight: 4.74,
      length: 813,
    },
    history: {
      overview:
        'The "Tommy Gun" became one of the most iconic weapons of WW2. Originally designed for trench warfare in WW1, it became a favorite of both gangsters and soldiers.',
      development:
        'The Thompson was designed by General John T. Thompson in 1919. The M1A1 variant was a simplified wartime production model that eliminated the compensator and used a simpler blowback action, making it cheaper and faster to produce.',
      combatHistory:
        'Widely used by U.S. forces, particularly paratroopers, Rangers, and non-commissioned officers. British Commandos and SAS also favored the weapon. Its heavy .45 caliber bullet provided excellent stopping power in close combat.',
      notableUses: [
        'Used extensively by U.S. paratroopers on D-Day',
        'Favored weapon of British Commandos',
        'Standard issue for U.S. Army NCOs and officers',
        'Used by resistance fighters across occupied Europe',
      ],
    },
    featured: true,
  },
  {
    id: 'mp40',
    slug: 'mp40',
    name: 'MP 40',
    designation: 'Maschinenpistole 40',
    category: 'guns',
    subcategory: 'smg',
    country: 'DE',
    manufacturer: 'Erma Werke',
    yearIntroduced: 1940,
    yearRetired: 1945,
    imageUrl: '/weapons/mp40.jpg',
    specs: {
      caliber: '9×19mm Parabellum',
      action: 'Open-bolt, blowback',
      rateOfFire: 500,
      muzzleVelocity: 400,
      effectiveRange: 200,
      magazineCapacity: 32,
      weight: 3.97,
      length: 833,
    },
    history: {
      overview:
        'The MP 40 was the standard submachine gun of the German Wehrmacht during WW2. Often erroneously called the "Schmeisser," it was actually designed by Heinrich Vollmer.',
      development:
        'Evolved from the MP 36 and MP 38, the MP 40 was designed for mass production using stamped steel and plastic components rather than machined parts. This made it one of the first major weapons to use modern manufacturing techniques.',
      combatHistory:
        'Issued primarily to platoon and squad leaders, paratroopers, and vehicle crews. The MP 40 became synonymous with the German soldier and saw action on all fronts. Its moderate rate of fire made it controllable and ammunition-efficient.',
      notableUses: [
        'Standard issue for German paratroopers (Fallschirmjäger)',
        'Used extensively during the Blitzkrieg campaigns',
        'Stalingrad urban combat',
        'Widely used by Waffen-SS units',
      ],
    },
    featured: true,
  },
  {
    id: 'kar98k',
    slug: 'kar98k',
    name: 'Karabiner 98k',
    designation: 'Karabiner 98 kurz',
    category: 'guns',
    subcategory: 'rifle',
    country: 'DE',
    manufacturer: 'Mauser',
    yearIntroduced: 1935,
    yearRetired: 1945,
    imageUrl: '/weapons/kar98k.jpg',
    specs: {
      caliber: '7.92×57mm Mauser',
      action: 'Bolt-action',
      rateOfFire: 15,
      muzzleVelocity: 760,
      effectiveRange: 500,
      magazineCapacity: 5,
      weight: 3.7,
      length: 1110,
    },
    history: {
      overview:
        'The Kar98k was the standard infantry rifle of the German Wehrmacht and one of the most produced bolt-action rifles in history, with over 14 million manufactured.',
      development:
        'A shortened version of the Gewehr 98, the Kar98k was adopted in 1935 as the standard German military rifle. It was based on the proven Mauser action that had been refined over decades.',
      combatHistory:
        'The Kar98k served on every front of WW2. While outmatched by the semi-automatic M1 Garand in rate of fire, its accuracy and reliability made it an effective infantry weapon. Many were equipped with telescopic sights for sniper use.',
      notableUses: [
        'Standard German infantry weapon throughout WW2',
        'Widely used as a sniper rifle with ZF39 or ZF41 scopes',
        'Battle of Stalingrad',
        'Defense of Normandy beaches on D-Day',
      ],
    },
    featured: false,
  },
  {
    id: 'colt-m1911',
    slug: 'colt-m1911',
    name: 'Colt M1911A1',
    designation: 'United States Pistol, Caliber .45, M1911A1',
    category: 'guns',
    subcategory: 'handgun',
    country: 'US',
    manufacturer: 'Colt\'s Manufacturing',
    yearIntroduced: 1924,
    yearRetired: 1986,
    imageUrl: '/weapons/m1911.png',
    specs: {
      caliber: '.45 ACP (11.43×23mm)',
      action: 'Short recoil operation',
      rateOfFire: 0,
      muzzleVelocity: 253,
      effectiveRange: 50,
      magazineCapacity: 7,
      weight: 1.12,
      length: 216,
    },
    history: {
      overview:
        'The M1911 is one of the most famous and longest-serving handguns in military history. Designed by legendary firearms engineer John Browning, it served as the standard-issue sidearm of the U.S. Armed Forces from 1911 to 1986.',
      development:
        'John Browning designed the M1911 in response to U.S. Army requirements for a .45 caliber semi-automatic pistol. The design proved so successful that it remained in service for 74 years with only minor modifications (the A1 variant in 1924).',
      combatHistory:
        'The M1911A1 was the standard sidearm for all U.S. military branches during WW2. Over 1.9 million were produced during the war years. Its powerful .45 ACP cartridge earned a reputation for stopping power and reliability.',
      notableUses: [
        'Standard U.S. military sidearm throughout WW2',
        'Sgt. Alvin York used an M1911 in his famous WW1 action',
        'Carried by officers, NCOs, and vehicle crews',
        'Used in close-quarters combat across all theaters',
      ],
    },
    featured: false,
  },

  // ═══════════════════════════════════════
  // TANKS
  // ═══════════════════════════════════════
  {
    id: 'tiger-i',
    slug: 'tiger-i',
    name: 'Tiger I',
    designation: 'Panzerkampfwagen VI Tiger Ausf. E',
    category: 'tanks',
    subcategory: 'heavy-tank',
    country: 'DE',
    manufacturer: 'Henschel & Son',
    yearIntroduced: 1942,
    yearRetired: 1945,
    imageUrl: '/weapons/tiger-i.jpg',
    specs: {
      crew: 5,
      weight: 57,
      armor: { front: 100, side: 80, rear: 80 },
      mainArmament: '88mm KwK 36 L/56',
      engine: 'Maybach HL230 P45 (700 hp)',
      maxSpeed: 45,
      range: 195,
      productionCount: 1347,
    },
    history: {
      overview:
        'The Tiger I was one of the most feared tanks of WW2. Its combination of the legendary 88mm gun and thick armor made it a formidable opponent that could destroy Allied tanks at ranges where they could not effectively fight back.',
      development:
        'Developed by Henschel under the direction of Ferdinand Porsche (who submitted a competing design). The Tiger I was designed as a breakthrough heavy tank with an emphasis on firepower and protection, accepting compromises in mobility and reliability.',
      combatHistory:
        'First deployed in September 1942 near Leningrad, the Tiger I quickly earned a fearsome reputation. Its 88mm gun could destroy any Allied tank at ranges exceeding 2,000 meters. However, it was expensive, complex, and mechanically unreliable, limiting its strategic impact.',
      notableUses: [
        'Michael Wittmann\'s legendary engagement at Villers-Bocage (1944)',
        'Heavy Tank Battalion 501-510 on the Eastern Front',
        'North Africa Campaign with 501st Heavy Panzer Battalion',
        'Battle of Kursk (1943)',
      ],
    },
    featured: true,
  },
  {
    id: 'm4-sherman',
    slug: 'm4-sherman',
    name: 'M4 Sherman',
    designation: 'Medium Tank, M4',
    category: 'tanks',
    subcategory: 'medium-tank',
    country: 'US',
    manufacturer: 'Various (Chrysler, GM, Ford)',
    yearIntroduced: 1942,
    yearRetired: 1957,
    imageUrl: '/weapons/m4-sherman.jpg',
    specs: {
      crew: 5,
      weight: 33.4,
      armor: { front: 51, side: 38, rear: 38 },
      mainArmament: '75mm M3 gun (or 76mm M1 gun)',
      engine: 'Continental R975 (400 hp)',
      maxSpeed: 48,
      range: 193,
      productionCount: 49234,
    },
    history: {
      overview:
        'The M4 Sherman was the most widely used medium tank by the Western Allies in WW2. While not the most powerful tank on the battlefield, its reliability, ease of manufacture, and sheer numbers made it decisive.',
      development:
        'Designed as a replacement for the M3 Lee/Grant, the Sherman featured a fully traversable turret and was engineered for mass production. Over 49,000 were built, making it one of the most-produced armored vehicles in history.',
      combatHistory:
        'The Sherman fought in every theater where Western Allied forces were engaged. Though outgunned by German heavy tanks, its numerical superiority, reliability, and versatility proved strategically superior. The later 76mm gun variant improved its anti-tank capability.',
      notableUses: [
        'D-Day landings with DD (Duplex Drive) swimming tanks',
        'Operation Cobra breakout from Normandy',
        'Battle of the Bulge',
        'Supplied to British, Soviet, and Free French forces via Lend-Lease',
      ],
    },
    featured: true,
  },
  {
    id: 't-34',
    slug: 't-34',
    name: 'T-34',
    designation: 'T-34/76 Medium Tank',
    category: 'tanks',
    subcategory: 'medium-tank',
    country: 'USSR',
    manufacturer: 'Kharkov Locomotive Factory',
    yearIntroduced: 1940,
    yearRetired: 1960,
    imageUrl: '/weapons/t-34.jpg',
    specs: {
      crew: 4,
      weight: 26.5,
      armor: { front: 47, side: 40, rear: 40 },
      mainArmament: '76.2mm F-34 gun',
      engine: 'V-2-34 diesel (500 hp)',
      maxSpeed: 53,
      range: 400,
      productionCount: 84000,
    },
    history: {
      overview:
        'The T-34 is widely regarded as the most important tank of WW2 and one of the most influential tank designs in history. Its combination of firepower, protection, and mobility shocked the Germans when first encountered in 1941.',
      development:
        'Designed by Mikhail Koshkin at the Kharkov Locomotive Factory. The T-34 introduced revolutionary features: sloped armor that effectively increased protection, a powerful diesel engine, and wide tracks for superior cross-country mobility in Russian terrain.',
      combatHistory:
        'When the T-34 appeared in 1941, it outclassed every German tank then in service. The Germans were forced to develop the Panther as a direct response. The T-34 formed the backbone of Soviet armored forces throughout the war, with the later T-34/85 variant carrying an 85mm gun.',
      notableUses: [
        'Battle of Kursk - largest tank battle in history (1943)',
        'Battle of Stalingrad (1942-1943)',
        'Operation Bagration (1944)',
        'Fall of Berlin (1945)',
      ],
    },
    featured: true,
  },
  {
    id: 'panzer-iv',
    slug: 'panzer-iv',
    name: 'Panzer IV',
    designation: 'Panzerkampfwagen IV Ausf. H',
    category: 'tanks',
    subcategory: 'medium-tank',
    country: 'DE',
    manufacturer: 'Krupp',
    yearIntroduced: 1939,
    yearRetired: 1945,
    imageUrl: '/weapons/panzer-iv.jpg',
    specs: {
      crew: 5,
      weight: 25,
      armor: { front: 80, side: 30, rear: 20 },
      mainArmament: '75mm KwK 40 L/48',
      engine: 'Maybach HL120 TRM (300 hp)',
      maxSpeed: 38,
      range: 210,
      productionCount: 8553,
    },
    history: {
      overview:
        'The Panzer IV was the most widely produced German tank of WW2 and the backbone of the Panzerwaffe. Originally designed as an infantry support tank, it was continually upgraded to serve as the primary medium tank.',
      development:
        'Designed by Krupp in the late 1930s, the Panzer IV originally mounted a short-barreled 75mm gun for infantry support. As the war progressed, it received increasingly powerful long-barreled guns and additional armor to remain competitive.',
      combatHistory:
        'The Panzer IV served in every theater of German operations. Unlike the more famous Tiger and Panther, its reliability and simpler design made it the practical workhorse of German armored divisions. The Ausf. H and J variants with the long 75mm gun were effective against most Allied tanks.',
      notableUses: [
        'Blitzkrieg campaigns in Poland and France',
        'North Africa Campaign under Rommel',
        'Eastern Front operations',
        'Normandy defense (1944)',
      ],
    },
    featured: false,
  },

  // ═══════════════════════════════════════
  // PLANES
  // ═══════════════════════════════════════
  {
    id: 'p-51-mustang',
    slug: 'p-51-mustang',
    name: 'P-51 Mustang',
    designation: 'North American P-51D Mustang',
    category: 'planes',
    subcategory: 'fighter',
    country: 'US',
    manufacturer: 'North American Aviation',
    yearIntroduced: 1942,
    yearRetired: 1957,
    imageUrl: '/weapons/p51-mustang.jpg',
    specs: {
      crew: 1,
      wingspan: 11.28,
      maxSpeed: 703,
      range: 2655,
      ceiling: 12770,
      armament: ['6× .50 cal M2 Browning machine guns', '10× 5-inch rockets or 2× 1,000 lb bombs'],
      engine: 'Packard V-1650-7 Merlin (1,490 hp)',
      productionCount: 15586,
    },
    history: {
      overview:
        'The P-51 Mustang is widely considered the best all-around fighter aircraft of WW2. With the introduction of the Rolls-Royce Merlin engine, it became the premier Allied escort fighter, turning the tide of the air war over Europe.',
      development:
        'Originally designed in 1940 for the British, the early Allison-engined P-51 was a capable low-altitude fighter. The installation of the Rolls-Royce (Packard) Merlin engine transformed it into a superb high-altitude fighter with exceptional range.',
      combatHistory:
        'The P-51D became the primary long-range escort fighter for Eighth Air Force bomber formations. Its ability to escort bombers all the way to Berlin and back fundamentally changed the strategic air war. It also excelled in ground attack and reconnaissance roles.',
      notableUses: [
        'Long-range bomber escort missions over Germany',
        'Tuskegee Airmen flew P-51s with distinction',
        'Air superiority during D-Day and Operation Overlord',
        'Pacific Theater operations in 1945',
      ],
    },
    featured: true,
  },
  {
    id: 'spitfire',
    slug: 'spitfire',
    name: 'Supermarine Spitfire',
    designation: 'Supermarine Spitfire Mk.IX',
    category: 'planes',
    subcategory: 'fighter',
    country: 'UK',
    manufacturer: 'Supermarine (Vickers)',
    yearIntroduced: 1938,
    yearRetired: 1955,
    imageUrl: '/weapons/spitfire.jpg',
    specs: {
      crew: 1,
      wingspan: 11.23,
      maxSpeed: 656,
      range: 740,
      ceiling: 13100,
      armament: ['2× 20mm Hispano Mk II cannon', '4× .303 Browning machine guns'],
      engine: 'Rolls-Royce Merlin 63 (1,710 hp)',
      productionCount: 20351,
    },
    history: {
      overview:
        'The Spitfire is the most famous British fighter aircraft of WW2 and an enduring symbol of the Battle of Britain. Its elegant elliptical wing design gave it exceptional maneuverability and became an icon of British resilience.',
      development:
        'Designed by R.J. Mitchell, the Spitfire first flew in 1936. It was continuously developed throughout the war, with over 24 variants produced. Each mark brought improvements in engine power, armament, and altitude performance.',
      combatHistory:
        'The Spitfire\'s finest hour came during the Battle of Britain in 1940, where it fought alongside the Hurricane to defeat the Luftwaffe. It served in every theater of war and was continuously upgraded to match or exceed enemy fighters throughout the conflict.',
      notableUses: [
        'Battle of Britain (1940) - defending against the Luftwaffe',
        'Air defense of Malta (1942)',
        'Desert Air Force in North Africa',
        'Photo-reconnaissance variants flew unarmed deep into enemy territory',
      ],
    },
    featured: true,
  },
  {
    id: 'bf-109',
    slug: 'bf-109',
    name: 'Messerschmitt Bf 109',
    designation: 'Messerschmitt Bf 109G-6 "Gustav"',
    category: 'planes',
    subcategory: 'fighter',
    country: 'DE',
    manufacturer: 'Bayerische Flugzeugwerke (Messerschmitt)',
    yearIntroduced: 1937,
    yearRetired: 1945,
    imageUrl: '/weapons/bf109.jpg',
    specs: {
      crew: 1,
      wingspan: 9.92,
      maxSpeed: 621,
      range: 850,
      ceiling: 11750,
      armament: ['1× 20mm MG 151/20 cannon (engine-mounted)', '2× 13mm MG 131 machine guns'],
      engine: 'Daimler-Benz DB 605A (1,475 hp)',
      productionCount: 33984,
    },
    history: {
      overview:
        'The Bf 109 was the most-produced fighter aircraft in history with nearly 34,000 built. It was the backbone of the Luftwaffe\'s fighter force from the Spanish Civil War through the end of WW2.',
      development:
        'Designed by Willy Messerschmitt in the early 1930s, the Bf 109 was a revolutionary design featuring an all-metal monocoque construction, retractable landing gear, and enclosed cockpit. Like the Spitfire, it was continuously upgraded throughout the war.',
      combatHistory:
        'The Bf 109 scored more aerial victories than any other aircraft in history. German aces like Erich Hartmann (352 victories) and Gerhard Barkhorn (301 victories) achieved their remarkable scores flying the Bf 109. It fought on every front where Germany was engaged.',
      notableUses: [
        'Spanish Civil War - Condor Legion (first combat use)',
        'Battle of Britain - primary Luftwaffe fighter',
        'Eastern Front - top-scoring aces flew the "Gustav"',
        'Defense of the Reich against Allied bomber formations',
      ],
    },
    featured: true,
  },
  {
    id: 'b-17-flying-fortress',
    slug: 'b-17-flying-fortress',
    name: 'B-17 Flying Fortress',
    designation: 'Boeing B-17G Flying Fortress',
    category: 'planes',
    subcategory: 'bomber',
    country: 'US',
    manufacturer: 'Boeing',
    yearIntroduced: 1938,
    yearRetired: 1968,
    imageUrl: '/weapons/b17.jpg',
    specs: {
      crew: 10,
      wingspan: 31.62,
      maxSpeed: 462,
      range: 3219,
      ceiling: 10850,
      armament: ['13× .50 cal M2 Browning machine guns', 'Up to 7,800 lb bomb load'],
      engine: '4× Wright R-1820-97 Cyclone (1,200 hp each)',
      productionCount: 12731,
    },
    history: {
      overview:
        'The B-17 Flying Fortress was the iconic American heavy bomber of WW2. Known for its ruggedness and ability to sustain tremendous battle damage while still returning home, it became a symbol of American air power.',
      development:
        'Boeing developed the Model 299 in 1935 as a private venture. Its heavy defensive armament earned it the "Flying Fortress" nickname from a journalist. The definitive B-17G model featured a chin turret to counter head-on fighter attacks.',
      combatHistory:
        'The B-17 was the primary heavy bomber of the U.S. Eighth Air Force in the European Theater. Flying in large formations at high altitude, B-17s conducted daylight precision bombing raids against German industrial and military targets. The missions were extremely dangerous, with some raids suffering over 25% losses.',
      notableUses: [
        'Schweinfurt-Regensburg raids (1943) - devastating losses led to fighter escort doctrine',
        'Strategic bombing of German ball-bearing factories',
        'Big Week (February 1944) - campaign against Luftwaffe production',
        'The famous "Memphis Belle" was a B-17F',
      ],
    },
    featured: false,
  },

  // ═══════════════════════════════════════
  // NAVAL
  // ═══════════════════════════════════════
  {
    id: 'bismarck',
    slug: 'bismarck',
    name: 'Bismarck',
    designation: 'Bismarck-class Battleship',
    category: 'naval',
    subcategory: 'battleship',
    country: 'DE',
    manufacturer: 'Blohm & Voss, Hamburg',
    yearIntroduced: 1940,
    yearRetired: 1941,
    imageUrl: '/weapons/bismarck.jpg',
    specs: {
      displacement: 50300,
      length: 251,
      speed: 30,
      range: 8870,
      crew: 2092,
      armament: [
        '8× 38cm SK C/34 guns (4 twin turrets)',
        '12× 15cm SK C/28 guns',
        '16× 10.5cm SK C/33 AA guns',
        '16× 3.7cm SK C/30 AA guns',
      ],
      armor: { belt: 320, deck: 120 },
    },
    history: {
      overview:
        'The Bismarck was the most powerful battleship in the German Kriegsmarine and one of the largest warships ever built by a European power. Her brief but dramatic career captivated the world and led to one of the greatest naval chases in history.',
      development:
        'Named after Chancellor Otto von Bismarck, she was laid down in 1936 and commissioned in August 1940. At 50,000 tons, she exceeded treaty limitations and featured advanced fire control systems and extensive armor protection.',
      combatHistory:
        'During Operation Rheinübung in May 1941, Bismarck sank HMS Hood, the pride of the Royal Navy, with a devastating magazine explosion. This triggered a massive Royal Navy pursuit involving dozens of warships. After being slowed by a Swordfish torpedo hit to her rudder, Bismarck was battered by HMS King George V and HMS Rodney before sinking on May 27, 1941.',
      notableUses: [
        'Battle of the Denmark Strait - sank HMS Hood (May 24, 1941)',
        'The largest naval pursuit in history',
        'Swordfish torpedo bombers crippled her rudder',
        'Wreck discovered by Robert Ballard in 1989',
      ],
    },
    featured: true,
  },
  {
    id: 'type-vii-uboat',
    slug: 'type-vii-uboat',
    name: 'Type VII U-boat',
    designation: 'Unterseeboot Typ VII C',
    category: 'naval',
    subcategory: 'submarine',
    country: 'DE',
    manufacturer: 'Various German shipyards',
    yearIntroduced: 1940,
    yearRetired: 1945,
    imageUrl: '/weapons/u-boat.jpg',
    specs: {
      displacement: 769,
      length: 67.1,
      speed: 17,
      range: 8500,
      crew: 44,
      armament: [
        '5× 53.3cm torpedo tubes (4 bow, 1 stern)',
        '14 torpedoes',
        '1× 8.8cm SK C/35 deck gun',
        '1× 2cm Flak anti-aircraft gun',
      ],
      armor: { belt: 18, deck: 0 },
    },
    history: {
      overview:
        'The Type VII was the most common U-boat type in the German Kriegsmarine during WW2, with 703 built. These submarines waged the Battle of the Atlantic, the longest continuous campaign of the war.',
      development:
        'Evolved from WW1 submarine designs, the Type VII was designed in the 1930s as a medium-range ocean-going submarine. The Type VIIC was the most-produced variant, optimized for Atlantic patrol operations with improvements in range and weaponry.',
      combatHistory:
        'U-boats nearly won the Battle of the Atlantic. In the "Happy Time" of 1940-1941, wolf packs devastated Allied convoys. However, Allied countermeasures including radar, Ultra intelligence, improved depth charges, and escort carriers gradually turned the tide. Of 1,162 U-boats built, 784 were destroyed.',
      notableUses: [
        'Battle of the Atlantic - the longest battle of WW2',
        'Wolf pack tactics terrorized Allied shipping',
        '"Happy Time" (1940-1941) - peak U-boat success',
        'U-47 sank HMS Royal Oak at Scapa Flow (1939)',
      ],
    },
    featured: true,
  },
];

export function getWeaponBySlug(slug: string): Weapon | undefined {
  return weapons.find((w) => w.slug === slug);
}

export function getWeaponsByCategory(category: WeaponCategory): Weapon[] {
  return weapons.filter((w) => w.category === category);
}

export function getWeaponsBySubcategory(subcategory: WeaponSubcategory): Weapon[] {
  return weapons.filter((w) => w.subcategory === subcategory);
}

export function getFeaturedWeapons(): Weapon[] {
  return weapons.filter((w) => w.featured);
}
