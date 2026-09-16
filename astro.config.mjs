import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://geometry-trigonometry-lab-rado.radod.chatgpt.site',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: page => !page.endsWith('/404/') })],
});
