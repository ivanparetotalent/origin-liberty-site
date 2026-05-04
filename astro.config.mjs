import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://originliberty.com',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
    icon({ include: { lucide: ['*'] } }),
  ],

  output: "hybrid",

  build: {
    inlineStylesheets: 'auto',
  },

  prefetch: true,
  adapter: cloudflare()
});