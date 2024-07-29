import type { PostContent } from '@/utils/readPost';
import getAllPosts, { type Post } from './getAllPosts';

export default function getMorePosts(
  { metadata }: PostContent,
  slug: string,
): [
  (Post & { relatedTags: number })[],
  {
    title: string | undefined;
    slug: string;
  }[],
] {
  const tags =
    typeof metadata.tags === 'string'
      ? metadata.tags.split(',').map((l: string) => l.trim())
      : [];
  const posts = getAllPosts();

  const series = posts
    .filter(
      (p) =>
        typeof p.metadata.series === 'string' &&
        p.metadata.series === metadata.series,
    )
    .map(({ metadata, slug }) => ({ title: metadata.title, slug }))
    .reverse(); // sort asc instead of desc

  const related = posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      relatedTags: tags.reduce(
        (num: number, tag: string) =>
          post.metadata.tags?.includes(tag) ? num + 1 : num,
        0,
      ),
      ...post,
    }))
    .sort((a, b) => {
      // More related tags
      if (a.relatedTags < b.relatedTags) return 1;
      if (a.relatedTags > b.relatedTags) return -1;

      const dateA = a.metadata.created ? new Date(a.metadata.created) : 0;
      const dateB = b.metadata.created ? new Date(b.metadata.created) : 0;

      // Date
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;

      return 0;
    })
    .slice(0, 4);

  return [related, series];
}
