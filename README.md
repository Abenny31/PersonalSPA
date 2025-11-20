# Personal SPA

Single page application built with React 18, Vite, TypeScript, Tailwind CSS, and react-i18next. Designed for simple deployment to GitHub Pages on the `gh-pages` branch.

## Features
- Smooth single-page navigation with sections for hero, about, projects, and contact
- EN/HR localisation with language preference persisted to `localStorage`
- Tailwind-based responsive layout and accessible form controls
- Contact form wired to Formspree (replace with your form action URL)

## Getting Started
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - start the local dev server on `http://localhost:5173`
- `npm run prod` - build then preview the production bundle (uses GH Pages base) at `http://localhost:4173`
- `npm run build` - type-check and output production build in `dist`
- `npm run preview` - serve the last build on `http://localhost:4173`
- `npm run lint` - run ESLint with the flat config
- `npm run deploy` - convenience alias for `npm run build`

