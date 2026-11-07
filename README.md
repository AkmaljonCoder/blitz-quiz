# ⚡ Blitz Quiz

A free, mobile-first German vocabulary app for Uzbek-speaking learners. Practice A1 words through quizzes and flashcards, entirely in Uzbek.

**Live:** [bg-quiz.vercel.app](https://bg-quiz.vercel.app)

---

## Why Blitz Quiz?

Most German learning tools assume English or Russian as the base language. Blitz Quiz fills that gap for learners in Uzbekistan by turning real course vocabulary, lesson by lesson, into short, repeatable practice that works on any phone with no account and no installation.

## Features

- **Two levels, 24 units.** A1.1 and A1.2, each with 12 units of German↔Uzbek word pairs.
- **Quick and full quizzes.** Multiple-choice tests with instant correct and wrong feedback, switchable with a single toggle.
- **Flashcards.** Smooth 3D flip cards with shuffle and navigation.
- **Missed-word review.** Automatically builds a new quiz from the words you got wrong.
- **Searchable word list.** Find any word fast. Search ignores case, umlauts and apostrophe variants.
- **Mobile-first design.** Full-bleed cards and fullscreen modals on phones.

## Tech stack

- React (hooks, React Router with URL-param routing: `/quiz/:id`)
- lucide-react for icons
- Plain CSS with a custom dark, glassmorphism design system
- Orbitron and Manrope typography
- Deployed on Vercel

## Getting started

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

## Project structure

| Path | Purpose |
|---|---|
| `VOCAB.js` | All vocabulary data, one entry per unit, each with a `level` field |
| `Home.jsx` | Unit list with level filtering |
| `Quiz.jsx` | Quiz, flashcard and review logic |
| `style.md` | Design system guide: colors, typography, animation and components |

## Adding vocabulary

Every unit in `VOCAB.js` carries an explicit `level` field, so adding a new level (for example A2) only requires adding the data and extending the filter on the home page. `Quiz.jsx` picks up the level automatically.

## Design

The interface uses a dark, neon, glassmorphism style with a purple-to-blue accent gradient, springy animations and edge-to-edge cards on mobile. The full guidelines are in [`style.md`](./style.md). Please read it before contributing UI changes, and keep all interface text in Uzbek.

## Roadmap

- [ ] Complete the remaining A1.2 units
- [ ] Spaced repetition
- [ ] Teacher dashboard for language centers
- [ ] A2 level
- [ ] Possible rename to **Yodla** (from the Uzbek *yodlamoq*, "to memorize")

## Contributing

Contributions are welcome, especially new vocabulary units and translation fixes. Open an issue to discuss larger changes, then submit a pull request.

## Author

Built by **Akmal** · [@akmalcode](https://instagram.com/akmalcode) · [@dev.akmal](https://instagram.com/dev.akmal)
