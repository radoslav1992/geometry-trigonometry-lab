import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://geometrylab.net',
  output: 'static',
  trailingSlash: 'always',
  // Teacher answer keys are noindex and kept out of the sitemap.
  integrations: [sitemap({ filter: page => !page.endsWith('/404/') && !page.includes('/teachers/answers/') })],
});
