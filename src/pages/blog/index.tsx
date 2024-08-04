import getAllPosts from '@/utils/getAllPosts';
import type { RequestContext } from 'brisa';

export default function Blog(
  _: undefined,
  { i18n, store, route }: RequestContext,
) {
  const posts = getAllPosts();
  const tags = posts.reduce<string[]>((t, post) => {
    const postTags = post.metadata.tags?.split(',') ?? [];
    for (const tag of postTags) {
      const trimmedTag = tag.trim();
      if (!t.includes(trimmedTag)) {
        t.push(trimmedTag);
      }
    }

    return t;
  }, []);

  store.set('tags', tags);
  store.set('posts', posts);
  store.transferToClient(['tags', 'posts']);

  return (
    <post-list
      path={`/${i18n.locale}${route.pathname.split('?')[0]}`}
      tags={tags}
      search={route.query.q}
      page={Number.isInteger(route.query.page) ? Number(route.query.page) : 1}
    />
  );
}
