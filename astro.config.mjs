import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repository === `${owner}.github.io`;
const customSite = process.env.SITE_URL?.replace(/\/$/, '');
const site = customSite || (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = customSite || isUserSite || !repository ? '/' : `/${repository}`;

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
