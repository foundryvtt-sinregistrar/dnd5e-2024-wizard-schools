# Localization architecture

The base module ships English as its canonical content. Its stable Item, activity, effect, folder, and advancement IDs are the localization contract; translations must never alter them.

Spanish is maintained in the separate `translate-dnd5e-wizard-schools-2024-es` Babele module. It requires the base module, dnd5e, the PHB 2024 module, and Babele. Babele language JSON files localize application UI; its compendium JSON translates the documents themselves.

To start another language, copy the Spanish translation module, replace its ID and registered language, and translate only visible values. Run `node dev-tools/localization/validate-localizations.mjs --translation <path-to-json>` from this repository to confirm complete ID coverage and reject orphan entries.

