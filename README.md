# DISHA MADHUSUDANA — Player One Portfolio

Retro 2000s gameresque single-page portfolio.
React + Tailwind + framer-motion + Lenis smooth scroll.

## Files in this package

```
frontend/
├── package.json            # deps (react, framer-motion, lenis, tailwind, shadcn)
├── tailwind.config.js
├── postcss.config.js
├── craco.config.js
├── public/
│   └── index.html          # fonts: VT323, Press Start 2P, Fraunces, Space Mono
└── src/
    ├── index.js            # React entry
    ├── index.css           # CSS variables + tailwind base (light + dark palette)
    ├── App.css             # all portfolio styles (hero, cards, marquee, inventory, footer)
    └── App.js              # single-file portfolio: Hero → Marquee → Projects → Side Quests → Inventory → Manifesto → Footer
```

## Palette (from Disha's original style.css)

Light: bg #f2ecd8 · surface #fffdf6 · pink #c62368 · green #296b46 · text #241f1a
Dark:  bg #0a0d0a · surface #121810 · pink #ff4d94 · lime #4dff8f · text #e9ecd6

## To run locally

```bash
cd frontend
yarn install
yarn start
```

Opens at http://localhost:3000

## To build for production

```bash
yarn build
```

Static output goes to `frontend/build/` — deploy anywhere (Vercel, Netlify, GH Pages).

## Notes

- All page content (bio, 5 projects, 2 side quests, 12 skills, socials) lives at the top of `App.js` as plain JS arrays — edit those to change content.
- The `.dark` class on `<html>` toggles dark mode (see App.js `useState('light')` and the GameBoy-style toggle button).
- Project images are Unsplash placeholders — swap the `img:` URLs in `App.js`'s `PROJECTS` array for real screenshots.
- The Konami-code easter egg from the original site is referenced but not wired up in JS yet.
