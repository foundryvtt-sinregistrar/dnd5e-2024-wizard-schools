# D&D 2024 SubClasses - Wizard Schools

![Foundry v14.368](https://img.shields.io/badge/Foundry-v14.368-green)
![dnd5e 6.0.3](https://img.shields.io/badge/dnd5e-6.0.3-blue)![PHB 2024 required](https://img.shields.io/badge/PHB_2024-required-orange)

[![Latest Release](https://img.shields.io/github/v/release/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools?label=release)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases/latest)
[![Downloads Latest Release](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/latest/total?label=descargas%20%C3%BAltima%20release)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases/latest)

[![Downloads Total](https://img.shields.io/github/downloads/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/total?label=descargas%20totales)](https://github.com/foundryvtt-sinregistrar/dnd5e-2024-wizard-schools/releases)

This module adds the Conjurer, Enchanter, Necromancer, and Transmuter Wizard subclasses. It requires Foundry VTT 14.367+, dnd5e 6.0.3, and the official Dungeons & Dragons Player's Handbook (PHB 2024) module, which supplies the 2024 Wizard class and spell content.

English is the canonical language of this compendium. Install a separate translation module for another language; for Spanish, use `translate-dnd5e-wizard-schools-2024-es` together with Babele.

The compendium contains 24 documents in four folders. Subclasses use stable ItemGrant links at levels 3, 6, 10, and 14. IDs, UUIDs, formulas, and automation identifiers are stable across the language migration, so existing actor items remain valid.

## Updating from Spanish 1.14.x

1. Update this base module to 2.14.0 or later.
2. Install and activate Babele and the Spanish translation module.
3. Select Spanish in Foundry and reload the world.
4. Use current compendium entries for verification. Existing imported copies are not automatically synchronized by Foundry.

## Translating to another language

Copy the Spanish translation module as a template, change its module ID and language registration, and translate its Babele JSON only. Run the coverage validator documented in [LOCALIZATION.md](LOCALIZATION.md) before publishing.
