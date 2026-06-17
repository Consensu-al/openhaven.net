# Adding raw / orphan HTML pages (off-brand standalone documents)

For contributors (e.g. Brandon) who want to publish a self-contained HTML page that does
**not** use the OpenHaven site design — no shared nav, footer, layout, or design tokens.

This is fully supported and **cannot break the existing routes**. It uses Astro's
`public/` folder, which is copied to the site root verbatim, with zero processing.

## TL;DR

1. Drop the file in `public/research/` (create subfolders if you like):
   ```
   public/research/my-document.html   →   served at   /research/my-document.html
   ```
2. Put any CSS/JS/images it references in `public/` too and link them with absolute
   paths (e.g. `/research/my-document.css`, `/research/img/figure.png`).
3. (Optional) Make it discoverable on the `/research` landing — see "Surface it" below.

That's it. No build step understands or touches the file's contents.

## How the URL maps

| File you add                                  | URL it serves at                   |
| --------------------------------------------- | ---------------------------------- |
| `public/research/my-document.html`            | `/research/my-document.html`       |
| `public/research/notes/draft.html`            | `/research/notes/draft.html`       |
| `public/research/my-document/index.html`      | `/research/my-document/` (clean URL, no `.html`) |

Use the last form if you want a clean extension-less URL.

## The ONE rule: don't shadow a generated route

The build **will error** only if a `public/` file lands on the exact output path of a
page Astro generates. The research routes Astro generates today are:

- `/research/` (the landing)
- `/research/mapping-infrastructure/` (embedded report)
- `/research/peerfunding/` (embedded report)
- the `/pt-BR/...` mirrors of all three

So, inside `public/research/`:

- ❌ Do **not** create `index.html` (collides with the `/research` landing)
- ❌ Do **not** create `mapping-infrastructure/index.html` or `peerfunding/index.html`
- ✅ Any other name is safe: `public/research/anything-else.html`

New embedded reports are added as markdown in `src/content/research/` (a different
mechanism). As long as a raw page's name doesn't match a report slug folder, there's no
conflict.

## Surface it on the /research landing (optional)

Raw pages are "orphaned" by default — reachable only by their URL (not in the nav, the
sitemap, or i18n). To list one on the `/research` landing under **Additional documents**,
add an entry to `src/lib/research-links.ts`:

```ts
export const rawDocuments: RawDocument[] = [
  {
    title: 'My Standalone Document',
    href: '/research/my-document.html',
    description: 'One-line description of what this is.', // optional
  },
]
```

The landing renders that section only when the array is non-empty, and the cards open the
page in a new tab so the styled site stays open behind it. Both the EN and pt-BR landings
read the same list.

## Good to know

- **Nothing here goes through the design audit, i18n, or the matrix-data governance flow**
  — these pages are intentionally outside all of that.
- **Malformed HTML can't fail the build** — `public/` files skip the Astro pipeline.
- **Not in `sitemap.xml`** — `@astrojs/sitemap` only indexes generated pages, not `public/`
  files. Link to them manually (or via the landing) if you want them found.
- **This file lives in `docs/`** (a sibling of `src/` and `public/`), so it is *not*
  published — it's contributor documentation only.
