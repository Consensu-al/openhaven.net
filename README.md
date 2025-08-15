# OpenHaven.net

P2P Technology Comparison and Standards - A one-page e-brochure for the P2P ecosystem.

## Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Editing Content

The site content is easily editable through JSON files:

### Technology Comparison Matrix
Edit `src/data/p2p-technologies.json` to update the technology comparison table.

### Narrative Sections
Edit `src/data/narrative.json` to update the narrative text sections.

## Deployment

The site is configured for GitHub Pages deployment. Push to the `main` branch to trigger automatic deployment via GitHub Actions.

## Project Structure

```
openhaven.net/
├── src/
│   ├── components/
│   │   └── ComparisonMatrix.astro
│   ├── data/
│   │   ├── p2p-technologies.json
│   │   └── narrative.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.svg
└── astro.config.mjs
```
