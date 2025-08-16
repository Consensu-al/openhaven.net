// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://openhaven.net',
  base: '/',
  output: 'static',
  build: {
    format: 'file'
  },
  server: {
    host: true,
    allowedHosts: ['openhaven.ngrok.app']
  }
});
