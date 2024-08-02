import type { RequestContext } from 'brisa';
import getAllPosts from '@/utils/getAllPosts';

export default function Blog(_: undefined, { store }: RequestContext) {
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

  return <post-list tags={tags} />;
}
