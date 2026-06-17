import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// `research` collection — externally-authored research writeups imported as native
// pages (Story 9.2). Glob loader over flat markdown files in src/content/research/.
// `z` here is re-exported by astro:content (NOT the `zod` package).
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    // OpenHaven-authored one-sentence framing (editorial — not the author's text).
    summary: z.string(),
    // Original author tagline/dek, relocated verbatim from the source body.
    subtitle: z.string().optional(),
    // Optional second dek line (peerfunding's italic tagline — Decision 10).
    subtitle2: z.string().optional(),
    author: z.string(),
    authorUrl: z.string().url().optional(),
    publisher: z.string(),
    year: z.number(),
    license: z.string(),
    licenseUrl: z.string().url(),
    importedOn: z.string(),
    // Local diagram path (public-absolute) used for og:image + Article JSON-LD.
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { research };
