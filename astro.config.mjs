// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH let the same code deploy to a GitHub Pages sub-folder
// (e.g. https://user.github.io/medha/) or to the real domain (https://medhatrainings.com/).
// GitHub Pages reports the custom domain as http://, but the site is served over https,
// so force https (otherwise canonical tags, sitemap and og:image all point at a redirect).
const site = (process.env.SITE_URL || 'https://www.medhatrainings.com').replace(/^http:\/\//, 'https://');
const base = process.env.BASE_PATH || '/';
const b = base.replace(/\/$/, '');

// Old addresses that used to exist (or were linked) on the WordPress site
const redirects = {
  '/advanced-ai-training': `${b}/artificial-intelligence-training/`,
  '/angular-development': `${b}/angular-development-training/`,
  '/digital-marketing-2': `${b}/digital-marketing-training/`,
  '/sales-force-training': `${b}/salesforce-training-in-hyderabad/`,
  '/data-analytics-training': `${b}/data-analytics-training-2/`,
  '/react-js-training': `${b}/courses/`,
  '/blogs': `${b}/events/`,
  '/outsourcing': `${b}/contact-us/`,
  '/shop': `${b}/courses/`,
  '/cart': `${b}/courses/`,
};

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects,
  compressHTML: true,
  integrations: [sitemap({
    // leave out the 404 page and the old redirect addresses
    filter: (page) => !page.includes('/404') && !Object.keys(redirects).some((r) => page.replace(/\/$/, '').endsWith(r)),
  })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
