# Personal SPA

Production-ready single page application built with React 18, Vite, TypeScript, Tailwind CSS, and react-i18next. Designed for simple deployment to GitHub Pages on the `gh-pages` branch.

## Features
- Smooth single-page navigation with sections for hero, about, projects, and contact
- EN/HR localisation with language preference persisted to `localStorage`
- Tailwind-based responsive layout and accessible form controls
- Contact form wired to Formspree (replace with your form action URL)
- GitHub Pages workflow via `JamesIves/github-pages-deploy-action@v4`

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

## Internationalisation
- Translations live in `src/locales/en/common.json` and `src/locales/hr/common.json`.
- Add new keys there and consume them with `useTranslation`.
- The selected language is stored under the `personal-spa-language` key in `localStorage`.

## Content Updates
- Replace `/public/profile-ante.jpg` with your own photo (keep the same filename).
- Update project entries in `src/data/projects.ts` (and the corresponding translation strings) before publishing.
- All visible copy should come from the locale files so HR/EN stay in sync.

## Formspree Setup
1. Sign in at [formspree.io](https://formspree.io/).
2. Create a form and copy the provided action URL (the project is preconfigured with `https://formspree.io/f/xkgqlvbj`).
3. If you generate a new URL, override it via `.env.local` using `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id`.
4. Restart the dev server so Vite picks up the environment variable.
5. (Optional) Configure a thank-you page or email forwarding inside Formspree.

### EmailJS Alternative
If you prefer [EmailJS](https://www.emailjs.com/), create a `.env.local` file with:
```ini
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
Then swap the submission logic in `Contact.tsx` to use `emailjs.send`. Keep Formspree as the default to avoid extra dependencies.

## GitHub Pages Deployment
1. Update the `productionBase` value in `vite.config.ts` to `/<REPO_NAME>/` (TODO marker in file).
2. Push `main` (or `master`) to GitHub.
3. Enable GitHub Pages in **Settings > Pages**, set the source to `gh-pages`.
4. The workflow in `.github/workflows/deploy.yml` runs on every push to build and publish `dist` to `gh-pages`.
5. For a custom domain, add a `CNAME` file under `public/` (deployed automatically) and configure DNS records.

## Additional Notes
- `.nojekyll` is shipped via `public/` so Pages serves the SPA without Jekyll processing.
- Smooth scrolling is enabled globally with `scroll-behavior: smooth`.
- The app updates the document title and meta description whenever the language changes.
