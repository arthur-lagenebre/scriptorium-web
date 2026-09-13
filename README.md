# Scriptorium — Web

[![build](https://github.com/arthur-lagenebre/scriptorium-web/actions/workflows/build.yml/badge.svg)](https://github.com/arthur-lagenebre/scriptorium-web/actions/workflows/build.yml)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-work%20in%20progress-orange)]()

> Angular front end for reading and translating Magic: The Gathering cards in any language.
> Front Angular pour lire et traduire les cartes Magic: The Gathering dans toutes les langues.

**🇬🇧 [English](#english) · 🇫🇷 [Français](#français)**

---

## English

### The problem

Wizards of the Coast translates Magic cards into a handful of languages, and only keeps the English text up to date. Players in every other language are left with outdated cards, or with none at all.

**Scriptorium** lets a community maintain those translations itself. This repository is the part people actually see.

### What works today

- Reading a card in any language it has been translated into
- A permanent language rail listing exactly the languages that card exists in
- Multi-face cards — transform, adventure, modal DFC — rendered face by face
- Printing selector, with per-printing flavour text and artist
- Faithful Magic typography: mana symbols, loyalty abilities, saga chapters, level tiers, reminder text
- Sign-in with Google or GitHub

**Editing is not wired up yet.** The API accepts translations; the screen that submits them is the next milestone.

### A rewrite, not an upgrade

This front end was rebuilt from scratch on Angular 22, replacing an Angular 18 application. Between those versions nearly every default changed: zoneless change detection became the default for new projects in v21, `OnPush` became the default strategy in v22, Vitest replaced Karma as the default test runner, Signal Forms went stable, and TypeScript 6 became the floor.

Four successive `ng update` runs would have produced a project carrying Zone.js, Karma and eager change detection under a 2026 version number. Starting over on an application this small was both faster and more honest. The one piece carried over intact is the oracle text renderer, converted from template method calls to a pure pipe.

### Design

There is no component library here. The interface is hand-written SCSS over a small token system, with `@angular/aria` available for interactive patterns.

That is a deliberate choice rather than a preference for extra work. The visually important part of this application — the card itself — is bespoke whatever happens: mana symbols, type line, saga chapters, loyalty. A component kit would only dress the chrome around it, and its recognisable look would fight with the card.

Three rules hold the design together:

**Colour is information, never ornament.** The chrome is a cold slate; the only accent is brass. The five Magic colours exist as tokens, and they are reserved for colour identity and mana symbols. A colour in the interface says something about the card, or it has no business being there. English, for instance, is marked in the language rail by a rule under its code rather than by a tint, because it is not modifiable — and that is not a fact about the card.

**Typography serves twenty-odd scripts.** Noto Sans and Noto Serif were not chosen for their looks: they are the only free family covering every script this platform exists to serve, with Japanese, Korean and Chinese siblings on compatible metrics. Every translated block carries its own `lang` attribute, which drives denser line-height for CJK and switches the layout to right-to-left for Hebrew and Arabic. All spacing uses logical properties, so that flip is automatic.

**What is missing is shown.** A field with no translation in the selected language displays "à traduire" rather than silently falling back to English. On a translation platform, an empty field is the most useful information on the screen: it is the work left to do. Rulings are the one exception — they are almost never translated, and a missing one is not a task.

### Project layout

```
src/app/
├── core/
│   ├── api/         typed client for scriptorium-api
│   ├── auth/        session signals, bearer interceptor, OAuth callback
│   └── language/    available and selected language, direction, native names
├── features/
│   └── card/        card consultation
└── shared/
    ├── pipes/       oracle text renderer
    └── ui/          language rail
src/styles/_tokens.scss
```

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

Then open `http://localhost:4200/`. The API base URL lives in `src/environments/`.

**Running without a backend.** `CardApi` has a `useFixture` flag that reads `public/cards.json` instead of calling the API. The fixture holds 19 cards chosen for their awkward cases: a six-language card, three double-faced cards, a planeswalker, a saga, a leveler. It predates some API fields, so treat it as a rough stand-in rather than a contract.

```bash
npm run build
npm test
```

### Roadmap

- [ ] Search screen, so cards are reachable without pasting an identifier
- [ ] **Translation editing** — the core purpose of the project, and the reason the API exists
- [ ] Revision history and one-click revert
- [ ] Load the CJK font families on demand: shipping all of them costs several megabytes for a reader who only wants French
- [ ] Internationalise the interface itself — the labels are hardcoded French, which is ironic for a translation platform
- [ ] Real tests on the oracle renderer and the face normaliser, which is where the logic lives
- [ ] Drop the fixture flag once the database is populated

### Related repositories

| Repository | Role |
|---|---|
| [scriptorium-api](https://github.com/arthur-lagenebre/scriptorium-api) | REST API and data model |
| [scriptorium-importer](https://github.com/arthur-lagenebre/scriptorium-importer) | Scryfall ETL |
| **scriptorium-web** | This repository — Angular front end |

---

## Français

### Le problème

Wizards of the Coast ne traduit les cartes Magic que dans quelques langues, et ne met à jour que le texte anglais. Les joueurs de toutes les autres langues se retrouvent avec des cartes obsolètes, ou sans traduction du tout.

**Scriptorium** permet à une communauté de maintenir elle-même ces traductions. Ce dépôt en est la partie visible.

### Ce qui fonctionne aujourd'hui

- La lecture d'une carte dans chacune des langues où elle a été traduite
- Un rail de langues permanent, listant exactement les langues dans lesquelles la carte existe
- Les cartes multi-faces — transform, adventure, modal DFC — rendues face par face
- Le sélecteur d'impression, avec texte d'ambiance et artiste propres à chaque édition
- Une typographie Magic fidèle : symboles de mana, capacités de loyauté, chapitres de saga, paliers de niveau, texte de rappel
- La connexion via Google ou GitHub

**L'édition n'est pas encore branchée.** L'API accepte les traductions ; l'écran qui les soumet est le prochain jalon.

### Une réécriture, pas une mise à jour

Ce front a été reconstruit de zéro sur Angular 22, en remplacement d'une application Angular 18. Entre ces deux versions, presque tous les défauts ont changé : la détection de changements sans Zone.js est devenue le défaut des nouveaux projets en v21, `OnPush` la stratégie par défaut en v22, Vitest a remplacé Karma comme lanceur de tests, les Signal Forms sont passées stables, et TypeScript 6 est devenu le minimum.

Quatre `ng update` successifs auraient produit un projet traînant Zone.js, Karma et la détection eager sous un numéro de version 2026. Sur une application de cette taille, repartir à neuf était à la fois plus rapide et plus honnête. La seule pièce reprise telle quelle est le moteur de rendu du texte oracle, converti d'appels de méthode dans le gabarit en pipe pur.

### Le parti pris visuel

Aucune bibliothèque de composants ici. L'interface est écrite à la main en SCSS au-dessus d'un petit système de tokens, avec `@angular/aria` disponible pour les comportements interactifs.

C'est un choix délibéré, et non un goût du travail supplémentaire. La partie visuellement importante de cette application — la carte elle-même — est du sur-mesure de toute façon : symboles de mana, ligne de type, chapitres de saga, loyauté. Une bibliothèque n'habillerait que le décor autour, et son allure reconnaissable entrerait en concurrence avec la carte.

Trois règles tiennent l'ensemble :

**La couleur est une information, jamais un ornement.** Le chrome est une ardoise froide, l'unique accent est un laiton. Les cinq couleurs de Magic existent en tokens, et sont réservées à l'identité colorielle et aux symboles de mana. Une couleur dans l'interface dit quelque chose sur la carte, sinon elle n'a rien à y faire. L'anglais, par exemple, se signale dans le rail par un filet sous son code plutôt que par une teinte, parce qu'il n'est pas modifiable — et que ce n'est pas une propriété de la carte.

**La typographie sert une vingtaine de scripts.** Noto Sans et Noto Serif n'ont pas été choisies pour leur allure : ce sont les seules familles libres couvrant tous les scripts que la plateforme existe pour servir, avec des déclinaisons japonaise, coréenne et chinoise aux métriques compatibles. Chaque bloc traduit porte son propre attribut `lang`, qui déclenche un interligne plus généreux pour les scripts denses et bascule la mise en page en droite-à-gauche pour l'hébreu et l'arabe. Tout l'espacement utilise des propriétés logiques, ce qui rend cette bascule automatique.

**Ce qui manque se voit.** Un champ sans traduction dans la langue choisie affiche « à traduire » plutôt que de retomber silencieusement sur l'anglais. Sur une plateforme de traduction, un champ vide est l'information la plus utile de l'écran : c'est le travail restant. Les rulings font seule exception — ils ne sont quasiment jamais traduits, et leur absence n'est pas une tâche.

### Organisation

```
src/app/
├── core/
│   ├── api/         client typé de scriptorium-api
│   ├── auth/        signaux de session, intercepteur, retour OAuth
│   └── language/    langues disponibles et choisie, sens d'écriture, noms natifs
├── features/
│   └── card/        consultation d'une carte
└── shared/
    ├── pipes/       rendu du texte oracle
    └── ui/          rail de langues
src/styles/_tokens.scss
```

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

Puis ouvrir `http://localhost:4200/`. L'URL de base de l'API se trouve dans `src/environments/`.

**Travailler sans backend.** `CardApi` porte un indicateur `useFixture` qui lit `public/cards.json` au lieu d'appeler l'API. Ce jeu de test contient 19 cartes choisies pour leurs cas difficiles : une carte en six langues, trois cartes double face, un planeswalker, une saga, un leveler. Il est antérieur à certains champs de l'API : à traiter comme un substitut approximatif, pas comme un contrat.

```bash
npm run build
npm test
```

### Feuille de route

- [ ] Écran de recherche, pour atteindre une carte sans coller un identifiant
- [ ] **Édition des traductions** — la raison d'être du projet, et celle pour laquelle l'API existe
- [ ] Historique des révisions et annulation en un geste
- [ ] Charger les déclinaisons CJK des polices à la demande : les embarquer toutes coûte plusieurs mégaoctets à un lecteur qui ne veut que du français
- [ ] Internationaliser l'interface elle-même — les libellés sont en français codé en dur, ce qui est ironique pour une plateforme de traduction
- [ ] De vrais tests sur le rendu du texte oracle et sur la normalisation des faces, là où se trouve la logique
- [ ] Retirer l'indicateur de jeu de test une fois la base peuplée

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
