import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://originliberty.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({ filter: (page) => !page.includes('/ua') }),
    icon({ include: { lucide: ['*'] } }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: true,
});
