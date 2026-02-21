# WW2 Museum Agent Guide

## Project Snapshot
- Framework: Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- Rendering model: static export (`output: 'export'`) for GitHub Pages.
- Theme: military-style UI with category browsing and weapon detail pages.
- Current data source: local static datasets in `lib/data/weapons.ts` + `lib/data/expandedWeapons.ts` (no live backend wiring in use).

## Runbook
- Install: `npm ci`
- Dev server: `npm run dev`
- Build (default): `npm run build`
- Build for GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/ww2-museum npm run build`
- Start prod server: `npm run start`
- Lint: `npm run lint`

## Architecture Map
- `app/page.tsx`: root redirect to `/guns`.
- `app/(categories)/layout.tsx`: shared shell with `Sidebar` + `Header`.
- `app/(categories)/*/page.tsx`: category listing pages using `WeaponGrid`.
- `app/(categories)/*/[slug]/page.tsx`: weapon detail pages using `WeaponDetail`.
- `components/weapons/*`: cards, grids, and detail display.
- `components/3d/WeaponViewer.tsx`: R3F viewer and placeholder model.
- `lib/data/weapons.ts`: canonical content dataset.
- `lib/types/weapon.ts`: shared domain types and category/country config.
- `lib/utils.ts`: className helper + basePath-aware asset path helper.

## Critical Conventions
- Keep static-export compatibility. Avoid features that require server runtime on static hosts.
- Always use `assetPath(...)` for image/model asset URLs so basePath deployments work.
- When adding routes, ensure generated static params are present for dynamic pages.
- Keep category/subcategory values aligned with `WeaponCategory` and `WeaponSubcategory`.
- Preserve mobile responsiveness in both sidebar/header navigation and content grids.

## Deployment Notes
- GitHub Actions workflow: `.github/workflows/deploy.yml`.
- Build artifact path is `out/`.
- GitHub Pages build injects `NEXT_PUBLIC_BASE_PATH=/ww2-museum`.

## Data Editing Notes
- Weapon records must include: identity fields, category/subcategory, `specs`, `history`, and `featured`.
- If adding new countries, update `CountryCode` and `COUNTRIES` in `lib/types/weapon.ts`.
- If adding new categories/subcategories, update both type unions and `CATEGORY_CONFIG`.
