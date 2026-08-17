import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_NAMES } from './data/categories';

const categorySchema = z.enum(CATEGORY_NAMES as [string, ...string[]]);

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(
      (value) => value === '' || value == null ? undefined : value,
      z.coerce.date().optional(),
    ),
    category: categorySchema.default('기록'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    videoUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
