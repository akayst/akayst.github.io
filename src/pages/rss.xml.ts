import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const basePath = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, '');
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(basePath ? `${basePath}/` : '/', context.site!),
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `blog/${post.id}/`,
    })),
  });
}
