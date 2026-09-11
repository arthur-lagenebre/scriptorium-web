# Scriptorium — Web

[![Angular](https://img.shields.io/badge/Angular-18-DD0031)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-work%20in%20progress-orange)]()
[![build](https://github.com/arthur-lagenebre/scriptorium-web/actions/workflows/build.yml/badge.svg)](https://github.com/arthur-lagenebre/scriptorium-web/actions/workflows/build.yml)

> Angular front end for browsing and translating Magic: The Gathering cards in any language.
> Front Angular pour consulter et traduire les cartes Magic: The Gathering dans toutes les langues.

**🇬🇧 [English](#english) · 🇫🇷 [Français](#français)**

---

## English

### What this is

**Scriptorium** is a platform that lets a community translate trading card games into languages their publishers do not support. This repository is the part people actually see.

It consumes [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) and renders cards with their proper Magic typography.

### Features

- Search cards by name
- Card detail view: rules text, type line, mana cost, power/toughness, loyalty, flavour text, artist
- **Language switcher** listing every language a card has been translated into, defaulting to the browser's preferred language when available
- Printing selector — flavour text and artist change with the set
- Multi-face card support (transform, split, adventure, modal DFC…)
- Rulings display
- Faithful Magic rendering: mana symbols, tap symbols, planeswalker loyalty abilities, saga chapter numerals and level-up bars, via [mana-font](https://mana.andrewgioia.com/) and [keyrune](https://keyrune.andrewgioia.com/)

### Technical notes

- **Standalone components** throughout, no `NgModule`
- **Lazy loading** per route, with a resolver and a guard on the card detail route
- Angular Material for the language and set toggles
- The text renderer in `text.component.ts` parses Scryfall's oracle text notation (`{T}`, `{2/W}`, `+1:`, saga roman numerals) and substitutes the matching icon font glyphs. It is the most valuable piece of code in this repository and the one worth carrying over intact to the rewrite.

### Getting started

**Prerequisites**

- Node.js 20+
- A running instance of [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) with a populated database

```bash
git clone https://github.com/arthur-lagenebre/scriptorium-web.git
cd scriptorium-web
npm install
npm start
```

Then open `http://localhost:4200/`.

> ⚠️ **Known limitations:** the API URL is hardcoded in `src/app/services/card.service.ts` and currently points at `https://localhost:7276`, while the API listens on `http://localhost:5141` by default — adjust it to your setup. A `src/assets/cards.json` fixture is present and can be swapped in to run the app without a backend. The `package.json` and `angular.json` project name still read `card-tutor`; they will be renamed with the rewrite.

```bash
npm run build      # output in dist/
npm test           # unit tests via Karma
```

### Roadmap

The next milestone is a rewrite on Angular 22, carrying the editing feature with it. Angular 18 has been out of support since late 2025, and the current defaults — zoneless change detection, Vitest, signal-based APIs — differ enough that a fresh `ng new` is cleaner than four successive `ng update` runs on an application this size.

- [ ] Move the API URL into environment files
- [ ] **Translation editing UI** — the core purpose of the project, currently read-only
- [ ] Authentication, so contributions can be attributed and moderated
- [ ] Sanitise `[innerHTML]` output explicitly (safe today with Scryfall-sourced data, mandatory once text is user-submitted)
- [ ] Rewrite on Angular 22: standalone + zoneless, signals, Vitest
- [ ] Convert the text renderer from template method calls to a pure pipe, so it is not re-evaluated on every change detection cycle
- [ ] Internationalise the interface itself — the labels are currently hardcoded English, which is ironic for a translation platform
- [ ] Real unit tests (the current `.spec.ts` files are CLI scaffolding)
- [ ] Accessibility pass and responsive layout
- [ ] Add screenshots to this README

### Related repositories

| Repository | Role |
|---|---|
| [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) | REST API and data model |
| [scriptorium-importer](https://github.com/arthur-lagenebre/scriptorium-importer) | Scryfall ETL |
| **scriptorium-web** | This repository — Angular front end |

---

## Français

### De quoi s'agit-il

**Scriptorium** est une plateforme permettant à une communauté de traduire des jeux de cartes à collectionner dans les langues que leurs éditeurs ne prennent pas en charge. Ce dépôt en est la partie visible.

Il consomme [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) et affiche les cartes avec leur typographie Magic d'origine.

### Fonctionnalités

- Recherche de cartes par nom
- Vue détaillée : texte de règles, ligne de type, coût de mana, force/endurance, loyauté, texte d'ambiance, artiste
- **Sélecteur de langue** listant toutes les langues dans lesquelles la carte est traduite, avec sélection par défaut de la langue préférée du navigateur lorsqu'elle est disponible
- Sélecteur d'impression — le texte d'ambiance et l'artiste changent avec l'édition
- Prise en charge des cartes multi-faces (transform, split, adventure, modal DFC…)
- Affichage des rulings
- Rendu Magic fidèle : symboles de mana, symbole d'engagement, capacités de loyauté des planeswalkers, chiffres de chapitre des sagas et barres de niveau, via [mana-font](https://mana.andrewgioia.com/) et [keyrune](https://keyrune.andrewgioia.com/)

### Notes techniques

- **Composants standalone** partout, aucun `NgModule`
- **Lazy loading** par route, avec resolver et guard sur la route de détail
- Angular Material pour les sélecteurs de langue et d'édition
- Le moteur de rendu de `text.component.ts` analyse la notation du texte oracle de Scryfall (`{T}`, `{2/W}`, `+1:`, chiffres romains des sagas) et y substitue les glyphes des polices d'icônes. C'est le code le plus précieux de ce dépôt, et celui qu'il faudra reprendre tel quel lors de la réécriture.

### Démarrage

**Prérequis**

- Node.js 20+
- Une instance de [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) en cours d'exécution, avec une base peuplée

```bash
git clone https://github.com/arthur-lagenebre/scriptorium-web.git
cd scriptorium-web
npm install
npm start
```

Puis ouvrir `http://localhost:4200/`.

> ⚠️ **Limitations connues :** l'URL de l'API est codée en dur dans `src/app/services/card.service.ts` et pointe vers `https://localhost:7276`, alors que l'API écoute par défaut sur `http://localhost:5141` — à adapter à votre environnement. Un jeu de données `src/assets/cards.json` est présent et peut être substitué pour lancer l'application sans backend. Les noms de projet dans `package.json` et `angular.json` portent encore `card-tutor` ; ils seront renommés avec la réécriture.

```bash
npm run build      # sortie dans dist/
npm test           # tests unitaires via Karma
```

### Feuille de route

Le prochain jalon est une réécriture sur Angular 22, embarquant la fonctionnalité d'édition. Angular 18 est hors support depuis fin 2025, et les défauts actuels du framework — détection de changements sans Zone.js, Vitest, API à base de signaux — diffèrent suffisamment pour qu'un `ng new` propre soit préférable à quatre `ng update` successifs sur une application de cette taille.

- [ ] Déplacer l'URL de l'API dans les fichiers d'environnement
- [ ] **Interface d'édition des traductions** — la raison d'être du projet, aujourd'hui en lecture seule
- [ ] Authentification, pour attribuer et modérer les contributions
- [ ] Assainir explicitement les sorties `[innerHTML]` (sans risque aujourd'hui avec des données issues de Scryfall, indispensable dès que le texte sera saisi par des utilisateurs)
- [ ] Réécriture sur Angular 22 : standalone + zoneless, signaux, Vitest
- [ ] Convertir le moteur de rendu de texte en pipe pur plutôt qu'en méthodes appelées depuis le template, pour éviter sa ré-évaluation à chaque cycle de détection
- [ ] Internationaliser l'interface elle-même — les libellés sont actuellement en anglais codé en dur, ce qui est ironique pour une plateforme de traduction
- [ ] Véritables tests unitaires (les `.spec.ts` actuels sont ceux générés par la CLI)
- [ ] Passe d'accessibilité et mise en page responsive
- [ ] Ajouter des captures d'écran à ce README

### Dépôts liés

| Dépôt | Rôle |
|---|---|
| [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) | API REST et modèle de données |
| [scriptorium-importer](https://github.com/arthur-lagenebre/scriptorium-importer) | ETL Scryfall |
| **scriptorium-web** | Ce dépôt — front Angular |

---

## License / Licence

Code released under the [MIT License](LICENSE).
Code publié sous [licence MIT](LICENSE).

Icon fonts [mana-font](https://github.com/andrewgioia/mana) and [keyrune](https://github.com/andrewgioia/keyrune) by Andrew Gioia, used under their own licences.

### Fan content disclaimer

This project is unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. Not approved or endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. © Wizards of the Coast LLC.

Card data and images originate from [Scryfall](https://scryfall.com/). Any information obtained from the Scryfall API that is not © Wizards of the Coast LLC is © Scryfall LLC. Card images are displayed without cropping, distortion or removal of the copyright line and artist credit, as Scryfall requires. The MIT licence above covers **this repository's source code only** — it does not extend to card data, card names, rules text, artwork or Magic: The Gathering trademarks.

*Ce projet est un contenu de fan non officiel, autorisé au titre de la Fan Content Policy de Wizards of the Coast. Non approuvé ni soutenu par Wizards. Les images de cartes sont affichées sans rognage, déformation ni suppression de la mention de copyright et du crédit artiste, conformément aux exigences de Scryfall. La licence MIT ci-dessus couvre uniquement le code source de ce dépôt.*
