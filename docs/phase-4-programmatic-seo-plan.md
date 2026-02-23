# Phase 4 SEO Plan: Programmatic Scale (Weeks 16-24)

Last updated: 2026-02-23

## Objective

Scale qualified organic traffic by launching defensible programmatic page types that match long-tail intent while avoiding thin-content risk.

Primary goal:
- Increase non-brand clicks to research and detail pages through structured page generation with strong internal linking.

## Business Context and Constraints

- Site type: static Next.js export, data-backed WW2 reference/museum.
- Current strengths:
- strong weapon-detail coverage
- active comparison, battle, country, timeline hubs
- new research resources section
- Constraints:
- no thin template spam
- static-export compatibility
- content must remain historically coherent and useful

## Programmatic SEO Playbooks Selected

Using the `programmatic-seo` skill framework, the next phase should combine:

1. Profiles playbook
- Pattern: `[entity]` pages
- Implementation: manufacturers and operations (campaign entities) with aggregated evidence from existing weapon data

2. Comparisons playbook
- Pattern: `[X] vs [Y]`
- Implementation: expand comparison matrix with strict quality thresholds

3. Glossary playbook
- Pattern: `what is [term]`
- Implementation: WW2 doctrine and technical term glossary with examples linked to real records

4. Directory playbook
- Pattern: `[category] [filter]`
- Implementation: high-intent, data-backed index pages (year, theater, country intersections)

## Phase 4 Page Families

### A) Manufacturer Dossiers

- URL pattern: `/manufacturers/[slug]`
- Candidate volume: 25-45 pages (only manufacturers with >=2 records)
- Search intent: entity research, procurement/industrial history
- Required unique sections:
- timeline of introduced systems
- category mix and production footprint
- doctrine impact summary with linked battles/comparisons

### B) Year + Category Pages

- URL pattern: `/year/[year]/[category]`
- Candidate volume: 30-60 pages (index only combinations with >=2 qualifying records)
- Search intent: period-focused research (e.g., "1943 tanks ww2")
- Required unique sections:
- year narrative (what changed that year)
- top introductions by category
- related campaigns and country clusters

### C) Theater + Category Pages

- URL pattern: `/theaters/[theater]/[category]`
- Candidate volume: 15-30 pages
- Search intent: operational context by region/domain
- Required unique sections:
- theater-specific constraints (terrain/logistics)
- relevant systems by role
- map + linked battle hubs

### D) Programmatic Comparison Expansion

- URL pattern: `/compare/[left]-vs-[right]`
- Candidate volume: expand from 8 to 40-80 pages
- Generation rule:
- same role class OR historically co-deployed adversaries
- both sides must have sufficient data depth
- each page must include unique doctrine analysis and battle references

### E) WW2 Glossary Pages

- URL pattern: `/glossary/[term]`
- Candidate volume: 50-120 pages
- Search intent: definitions and contextual learning
- Required unique sections:
- concise definition
- why the term mattered operationally
- examples from at least 2 internal weapon or battle pages

## Data and Quality Requirements

## Data Sources

Priority order:
1. Existing first-party structured dataset (`lib/data/*`)
2. Curated editorial annotations (new short summaries per page)
3. Public historical references only where needed for accuracy support

## Quality Gates (Hard Rules)

A page is indexable only if all are true:
- unique intro paragraph (not token-swapped)
- at least 3 internal links to detail pages
- at least 1 unique synthesized insight section
- complete title/H1/meta/schema
- no near-duplicate body against sibling pages

Noindex rules:
- pages with <2 qualifying records
- auto-generated stubs without narrative value
- overlapping pages with unresolved cannibalization

## Template Requirements

All phase-4 templates should include:

1. Intent-match intro (40-90 words)
2. Data block/table with normalized units
3. Context section (doctrine, theater, or industrial angle)
4. "Related records" links (6-12 links where possible)
5. FAQ (3-5 questions)
6. JSON-LD appropriate to page type (ItemList, CollectionPage, FAQPage, BreadcrumbList)

## Internal Linking Architecture

Hub-and-spoke rollout:

- Hub level:
- `/manufacturers`
- `/year`
- `/theaters`
- `/glossary`

- Spoke level:
- each generated page links to:
- at least 6 weapon detail pages
- at least 1 comparison page
- at least 1 battle or country cluster page

Cross-link rules:
- add reciprocal links from detail pages when relevance threshold is met
- avoid orphan pages via sitemap inclusion + hub discoverability

## Implementation Roadmap

## Sprint 1 (Weeks 16-18): Foundations

- finalize schemas and URL taxonomy
- build shared template components
- launch hub indexes for manufacturers/year/theaters/glossary
- ship first 10-15 high-confidence pages

## Sprint 2 (Weeks 18-21): Scale Carefully

- expand manufacturer and year+category pages
- expand comparisons to 25+ pages
- launch first glossary batch
- implement thin-page guardrails (build-time checks)

## Sprint 3 (Weeks 21-24): Optimize and Prune

- grow winning clusters to target volume
- consolidate weak/cannibalized pages
- strengthen snippets and FAQs for low-CTR pages
- tune internal links based on click data

## Measurement Plan

Weekly dashboard:
- new pages indexed
- impressions by new page family
- pages with first click
- CTR outliers (high impressions / low clicks)
- internal-link assisted sessions to detail pages

Phase 4 success gates (end of week 24):
- +40-80 new high-quality indexable pages
- >=50 pages with active monthly clicks
- >=25 long-tail queries generating clicks from new families
- positive trend in non-brand clicks to detail pages from programmatic hubs

## Next Build Backlog (Priority)

1. Manufacturer hubs and pages (highest confidence, strongest data fit)
2. Year + category pages (clear long-tail pattern)
3. Comparison matrix expansion (strict quality gating)
4. Theater + category pages (depends on battle/theater normalization)
5. Glossary pages (parallel editorial stream)

## Technical Notes for This Codebase

- Keep static export compatibility for all dynamic routes with `generateStaticParams`.
- Use `assetPath(...)` for all images/maps.
- Add new page families to `app/sitemap.ts` with separate priorities.
- Introduce build-time validation to fail generation when quality gates are not met.
- Preserve mobile UX parity on dense programmatic templates.
