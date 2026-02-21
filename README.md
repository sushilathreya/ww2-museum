# Weapons of World War 2 Museum

Interactive World War II weapons repository built with Next.js (App Router), TypeScript, and Tailwind.

The app now lands directly on the `Guns` catalog and includes a much broader cross-category catalog spanning:
- guns
- tanks
- planes
- naval vessels
- explosives (grenades, mines, demolition charges, incendiaries)

Current repository size: **83 records**.

## Run Locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

For GitHub Pages builds:

```bash
NEXT_PUBLIC_BASE_PATH=/ww2-museum npm run build
```

## Analytics

Google Analytics (GA4) is enabled site-wide via `gtag.js`.

- Default Measurement ID: `G-BVPDE9HBJ6`
- Override with env var if you want a different property:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

In local development:

```bash
echo \"NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX\" >> .env.local
```

## Project Structure

- `app/(categories)/*`: category index pages and `[slug]` detail pages
- `app/page.tsx`: root route redirect to `/guns`
- `components/weapons/*`: reusable card/grid/detail UI
- `components/3d/WeaponViewer.tsx`: optional 3D model viewer
- `lib/data/weapons.ts`: original core dataset + merged export
- `lib/data/expandedWeapons.ts`: expanded WW2 catalog entries
- `lib/types/weapon.ts`: category, subtype, and spec type definitions

## Data Verification Notes

The expansion was validated against reference lists and item pages covering WW2 service weapons and platforms.

Primary reference set used:
- [List of World War II infantry weapons](https://en.wikipedia.org/wiki/List_of_World_War_II_infantry_weapons)
- [List of military vehicles of World War II](https://en.wikipedia.org/wiki/List_of_military_vehicles_of_World_War_II)
- [List of aircraft of World War II](https://en.wikipedia.org/wiki/List_of_aircraft_of_World_War_II)
- [List of U.S. Navy losses in World War II](https://en.wikipedia.org/wiki/List_of_U.S._Navy_losses_in_World_War_II)
- [List of Japanese Navy ships and war vessels in World War II](https://en.wikipedia.org/wiki/List_of_Japanese_Navy_ships_and_war_vessels_in_World_War_II)

Representative ship-class/item references used during verification:
- [USS Enterprise (CV-6)](https://en.wikipedia.org/wiki/USS_Enterprise_(CV-6))
- [Yamato](https://en.wikipedia.org/wiki/Japanese_battleship_Yamato)
- [Tirpitz](https://en.wikipedia.org/wiki/German_battleship_Tirpitz)
- [Essex-class aircraft carrier](https://en.wikipedia.org/wiki/Essex-class_aircraft_carrier)
- [Gato-class submarine](https://en.wikipedia.org/wiki/Gato-class_submarine)

### About Flashbangs

WW2-era catalogs include fragmentation/smoke/anti-tank grenades and demolition charges. Modern stun/flashbang grenades are generally post-war systems (for example, the U.S. M84 entered service much later).
- [M84 stun grenade](https://en.wikipedia.org/wiki/M84_stun_grenade)

## Notes

- This is an educational archive, not an operational or procurement dataset.
- Some entries are concise by design to cover broad WW2 weapon classes in one repository.
- 3D placeholder components were intentionally removed on February 21, 2026. If you want them back, restore `WeaponViewerPlaceholder` from Git history in `components/3d/WeaponViewer.tsx` and wire it again in `components/weapons/WeaponDetail.tsx`.
