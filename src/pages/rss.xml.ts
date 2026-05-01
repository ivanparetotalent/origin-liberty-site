import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/seo';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: `${SITE.name} — Notes`,
    description:
      'Field notes on relocation, taxes, residency, family logistics, and the math of jurisdiction.',
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
