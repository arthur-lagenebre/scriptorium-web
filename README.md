# Card Tutor

[![Angular](https://img.shields.io/badge/Angular-18-DD0031)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-work%20in%20progress-orange)]()

> Angular front end for browsing and translating Magic: The Gathering cards in any language.
> Front Angular pour consulter et traduire les cartes Magic: The Gathering dans toutes les langues.

**ðŸ‡¬ðŸ‡§ [English](#english) Â· ðŸ‡«ðŸ‡· [FranÃ§ais](#franÃ§ais)**

---

## English

### What this is

The user-facing half of a project that lets a community translate Magic cards into languages Wizards of the Coast does not support. It consumes [MTG.API](https://github.com/arthur-lagenebre/MTG.API) and renders cards with their proper Magic typography.

*"Tutor" is the Magic term for a card that searches your library for another card â€” which is what this application does with the card database.*

### Features

- Search cards by name
- Card detail view: rules text, type line, mana cost, power/toughness, loyalty, flavour text, artist
- **Language switcher** listing every language a card has been translated into, defaulting to the browser's preferred language when available
- Printing selector â€” flavour text and artist change with the set
- Multi-face card support (transform, split, adventure, modal DFCâ€¦)
- Rulings display
- Faithful Magic rendering: mana symbols, tap symbols, planeswalker loyalty abilities, saga chapter numerals and level-up bars, via [mana-font](https://mana.andrewgioia.com/) and [keyrune](https://keyrune.andrewgioia.com/)

### Technical notes

- **Standalone components** throughout, no `NgModule`
- **Lazy loading** per route, with a resolver and a guard on the card detail route
- Angular Material for the language and set toggles
- The text renderer in `text.component.ts` parses Scryfall's oracle text notation (`{T}`, `{2/W}`, `+1:`, saga roman numerals) and substitutes the matching icon font glyphs

### Getting started

**Prerequisites**

- Node.js 20+
- A running instance of [MTG.API](https://github.com/arthur-lagenebre/MTG.API) with a populated database

```bash
git clone https://github.com/arthur-lagenebre/card-tutor.git
cd card-tutor
npm install
npm start
```

Then open `http://localhost:4200/`.

> âš ï¸ **Known limitation:** the API URL is hardcoded in `src/app/services/card.service.ts` (`https://localhost:7276/api/CardTutors/`). Moving it into Angular environment files is on the roadmap. A `src/assets/cards.json` fixture is present and can be swapped in to run the app without a backend.

**Build**

```bash
npm run build      # output in dist/
npm test           # unit tests via Karma
```

### Roadmap

The next milestone is a rewrite on Angular 22, carrying the editing feature with it. Angular 18 has been out of support since late 2025, and the current defaults (zoneless change detection, Vitest, signal-based APIs) differ enough that a fresh `ng new` is cleaner than four successive `ng update` runs on an application this size.

- [ ] Move the API URL into environment files
- [ ] **Translation editing UI** â€” the core purpose of the project, currently read-only
- [ ] Authentication, so contributions can be attributed and moderated
- [ ] Sanitise `[innerHTML]` output explicitly (safe today with Scryfall-sourced data, mandatory once text is user-submitted)
- [ ] Rewrite on Angular 22: standalone + zoneless, signals, Vitest
- [ ] Convert the text renderer from template method calls to a pure pipe, so it is not re-evaluated on every change detection cycle
- [ ] Internationalise the interface itself â€” currently the labels are hardcoded English, which is ironic for a translation platform
- [ ] Real unit tests (the current `.spec.ts` files are CLI scaffolding)
- [ ] Accessibility pass and responsive layout
- [ ] Add screenshots to this README

### Related repositories

| Repository | Role |
|---|---|
| [MTG-Importer](https://github.com/arthur-lagenebre/MTG-Importer) | Scryfall ETL |
| [MTG.API](https://github.com/arthur-lagenebre/MTG.API) | REST API consumed by this app |
| **card-tutor** | This repository â€” Angular front end |

---

## FranÃ§ais

### De quoi s'agit-il

La moitiÃ© visible d'un projet permettant Ã  une communautÃ© de traduire les cartes Magic dans les langues que Wizards of the Coast ne prend pas en charge. L'application consomme [MTG.API](https://github.com/arthur-lagenebre/MTG.API) et affiche les cartes avec leur typographie Magic d'origine.

*Â« Tutor Â» dÃ©signe en Magic une carte qui va en chercher une autre dans la bibliothÃ¨que â€” ce que fait cette application avec la base de cartes.*

### FonctionnalitÃ©s

- Recherche de cartes par nom
- Vue dÃ©taillÃ©e : texte de rÃ¨gles, ligne de type, coÃ»t de mana, force/endurance, loyautÃ©, texte d'ambiance, artiste
- **SÃ©lecteur de langue** listant toutes les langues dans lesquelles la carte est traduite, avec sÃ©lection par dÃ©faut de la langue prÃ©fÃ©rÃ©e du navigateur lorsqu'elle est disponible
- SÃ©lecteur d'impression â€” le texte d'ambiance et l'artiste changent avec l'Ã©dition
- Prise en charge des cartes multi-faces (transform, split, adventure, modal DFCâ€¦)
- Affichage des rulings
- Rendu Magic fidÃ¨le : symboles de mana, symbole d'engagement, capacitÃ©s de loyautÃ© des planeswalkers, chiffres de chapitre des sagas et barres de niveau, via [mana-font](https://mana.andrewgioia.com/) et [keyrune](https://keyrune.andrewgioia.com/)

### Notes techniques

- **Composants standalone** partout, aucun `NgModule`
- **Lazy loading** par route, avec resolver et guard sur la route de dÃ©tail
- Angular Material pour les sÃ©lecteurs de langue et d'Ã©dition
- Le moteur de rendu de `text.component.ts` analyse la notation du texte oracle de Scryfall (`{T}`, `{2/W}`, `+1:`, chiffres romains des sagas) et y substitue les glyphes des polices d'icÃ´nes

### DÃ©marrage

**PrÃ©requis**

- Node.js 20+
- Une instance de [MTG.API](https://github.com/arthur-lagenebre/MTG.API) en cours d'exÃ©cution, avec une base peuplÃ©e

```bash
git clone https://github.com/arthur-lagenebre/card-tutor.git
cd card-tutor
npm install
npm start
```

Puis ouvrir `http://localhost:4200/`.

> âš ï¸ **Limitation connue :** l'URL de l'API est codÃ©e en dur dans `src/app/services/card.service.ts` (`https://localhost:7276/api/CardTutors/`). Son dÃ©placement vers les fichiers d'environnement Angular figure dans la feuille de route. Un jeu de donnÃ©es `src/assets/cards.json` est prÃ©sent et peut Ãªtre substituÃ© pour lancer l'application sans backend.

**Compilation**

```bash
npm run build      # sortie dans dist/
npm test           # tests unitaires via Karma
```

### Feuille de route

Le prochain jalon est une rÃ©Ã©criture sur Angular 22, embarquant la fonctionnalitÃ© d'Ã©dition. Angular 18 est hors support depuis fin 2025, et les dÃ©fauts actuels du framework (dÃ©tection de changements sans Zone.js, Vitest, API Ã  base de signaux) diffÃ¨rent suffisamment pour qu'un `ng new` propre soit prÃ©fÃ©rable Ã  quatre `ng update` successifs sur une application de cette taille.

- [ ] DÃ©placer l'URL de l'API dans les fichiers d'environnement
- [ ] **Interface d'Ã©dition des traductions** â€” la raison d'Ãªtre du projet, aujourd'hui en lecture seule
- [ ] Authentification, pour attribuer et modÃ©rer les contributions
- [ ] Assainir explicitement les sorties `[innerHTML]` (sans risque aujourd'hui avec des donnÃ©es issues de Scryfall, indispensable dÃ¨s que le texte sera saisi par des utilisateurs)
- [ ] RÃ©Ã©criture sur Angular 22 : standalone + zoneless, signaux, Vitest
- [ ] Convertir le moteur de rendu de texte en pipe pur plutÃ´t qu'en mÃ©thodes appelÃ©es depuis le template, pour Ã©viter sa rÃ©-Ã©valuation Ã  chaque cycle de dÃ©tection
- [ ] Internationaliser l'interface elle-mÃªme â€” les libellÃ©s sont actuellement en anglais codÃ© en dur, ce qui est ironique pour une plateforme de traduction
- [ ] VÃ©ritables tests unitaires (les `.spec.ts` actuels sont ceux gÃ©nÃ©rÃ©s par la CLI)
- [ ] Passe d'accessibilitÃ© et mise en page responsive
- [ ] Ajouter des captures d'Ã©cran Ã  ce README

### DÃ©pÃ´ts liÃ©s

| DÃ©pÃ´t | RÃ´le |
|---|---|
| [MTG-Importer](https://github.com/arthur-lagenebre/MTG-Importer) | ETL Scryfall |
| [MTG.API](https://github.com/arthur-lagenebre/MTG.API) | API REST consommÃ©e par cette application |
| **card-tutor** | Ce dÃ©pÃ´t â€” front Angular |

---

## License / Licence

Code released under the [MIT License](LICENSE).
Code publiÃ© sous [licence MIT](LICENSE).

Icon fonts [mana-font](https://github.com/andrewgioia/mana) and [keyrune](https://github.com/andrewgioia/keyrune) by Andrew Gioia, used under their own licences.

### Fan content disclaimer

This project is unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. Not approved or endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. Â© Wizards of the Coast LLC.

Card data and images originate from [Scryfall](https://scryfall.com/). Any information obtained from the Scryfall API that is not Â© Wizards of the Coast LLC is Â© Scryfall LLC. Card images are displayed without cropping, distortion or removal of the copyright line and artist credit, as Scryfall requires. The MIT licence above covers **this repository's source code only** â€” it does not extend to card data, card names, rules text, artwork or Magic: The Gathering trademarks.

*Ce projet est un contenu de fan non officiel, autorisÃ© au titre de la Fan Content Policy de Wizards of the Coast. Non approuvÃ© ni soutenu par Wizards. Les images de cartes sont affichÃ©es sans rognage, dÃ©formation ni suppression de la mention de copyright et du crÃ©dit artiste, conformÃ©ment aux exigences de Scryfall. La licence MIT ci-dessus couvre uniquement le code source de ce dÃ©pÃ´t.*
