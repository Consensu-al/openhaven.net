// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Wrap markdown <table> elements in a horizontally-scrollable <div.table-scroll>
// so wide tables scroll within their column instead of widening the page at narrow
// viewports (Design Audit #6 / AC13). Mirrors the existing .matrix-container pattern.
// Only affects rendered markdown (the `research` content collection today).
function rehypeWrapTables() {
  return (tree) => {
    const wrap = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'table') {
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          };
        } else {
          wrap(child);
        }
      }
    };
    wrap(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
  site: 'https://openhaven.net',
  base: '/',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory'
  },
  server: {
    host: true,
    allowedHosts: ['openhaven.ngrok.app']
  }
});
