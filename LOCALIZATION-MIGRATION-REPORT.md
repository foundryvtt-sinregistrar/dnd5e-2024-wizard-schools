# Localization migration report — 2026-10-03

## Delivered architecture

`dnd5e-2024-wizard-schools` 2.14.0 is the English canonical module. It keeps the existing 24 Item IDs, UUIDs, activity IDs, Active Effect IDs, folder IDs, advancement IDs, formulas, and automation identifiers.

`translate-dnd5e-2024-wizard-schools-es` 1.0.0 is a separate Spanish Babele translation module. It requires the base module, dnd5e 6.0.3, the PHB 2024 module, and Babele 2.9.1. It translates folders, document names and descriptions, source text, activities, effects, and advancement titles by ID.

## Compatibility matrix

| Component | Minimum | Verified |
| --- | --- | --- |
| Foundry VTT | 14.367 | 14.368 |
| dnd5e | 6.0.3 | 6.0.3 |
| Player's Handbook | — | 2.2.0 |
| Base module | 2.14.0 | 2.14.0 |
| Spanish translation | 1.0.0 | 1.0.0 |
| Babele | 2.9.1 | 2.9.1 |

## Evidence

- Base pack build and content validation: passed (24 Items, activities, effects, `system.source`, ItemGrant, and pack synchronization).
- Base Node suite: 17/17 passed.
- Cross-module localization coverage: passed (24 Items and 4 folders; no missing or orphan IDs).
- Spanish module Node suite and JSON parsing: passed.
- `git diff --check`: passed for both repositories.

## Publication sequence

1. Push the current base commit and publish/tag version `v2.14.0` after building its release assets.
2. Create the remote repository for the Spanish module, push commit `9498fff`, and publish version `v1.0.0`.
3. Install both releases with Babele, select Spanish, and reload a test world.
4. Confirm that the base compendium is English without the translation and Spanish with it.

## Functional-test status

The interactive Foundry check was not run: browser control was explicitly denied access to `http://localhost:31490/game`. No workaround was attempted. The portable validations above completed successfully; the four-step visual check remains required before publication.
