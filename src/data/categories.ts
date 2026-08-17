export const BLOG_CATEGORIES = [
  { name: '기록', slug: 'records', emoji: '📝' },
  { name: '개발', slug: 'dev', emoji: '💻' },
  { name: '일상', slug: 'life', emoji: '🌿' },
  { name: 'iOS', slug: 'ios', emoji: '📱' },
  { name: '공지', slug: 'notice', emoji: '📢' },
] as const;

export const CATEGORY_SLUGS = BLOG_CATEGORIES.map((item) => item.slug);

export const CATEGORY_NAMES = BLOG_CATEGORIES.map((item) => item.name);

export function getCategoryBySlug(slug: string | undefined) {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}
