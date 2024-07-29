import fs from 'node:fs';
import path from 'node:path';
import { dangerHTML, type RequestContext } from 'brisa';
import type { MatchedRoute } from 'bun';

import PostInfo from '@/components/post-info';
import PostItem from '@/components/post-item';
import clearPage from '@/utils/clearPage';
import getMorePosts from '@/utils/getMorePosts';
import readPost from '@/utils/readPost';
import BlogSeries from '@/components/blog-series';
// import getCanonical from '@/utils/getCanonical';

export default async function PostPage(
  _: undefined,
  { store, route }: RequestContext,
) {
  const { slug } = route.params;
  const { metadata, date, morePosts, series, __html, tags, timeToRead } =
    store.get('post') as Awaited<ReturnType<typeof loadPostData>>;

  return (
    <>
      <div key={slug} class="cover-image">
        <img
          loading="eager"
          src={metadata.cover_image}
          style={{ viewTransitionName: `img:${slug}`, aspectRatio: '960/432' }}
          alt={metadata.title}
        />
      </div>
      <h1 style={{ viewTransitionName: `title:${slug}` }} class="post-title">
        {metadata.title}
      </h1>
      <PostInfo date={date} timeToRead={timeToRead} />
      <div class="tags" style={{ marginBottom: 30 }}>
        {tags.map((tag: string) => (
          <a key={tag} href={`/blog?q=${tag}`} class="tag">
            {tag}
          </a>
        ))}
      </div>
      <BlogSeries key="series-top" title={metadata.series} series={series} />
      <div class="post">{dangerHTML(await __html)}</div>
      <BlogSeries
        style={{ marginTop: 40 }}
        key="series-bottom"
        title={metadata.series}
        series={series}
      />
      {morePosts.length > 0 && (
        <div style={{ marginBottom: 50 }}>
          <b class="related-posts-title">More...</b>
          {morePosts.map((p) => (
            <PostItem key={p.slug} {...p} />
          ))}
        </div>
      )}
    </>
  );
}

async function loadPostData(route: MatchedRoute) {
  const {
    params: { slug },
  } = route;
  const post = readPost(slug);
  const [morePosts, series] = await getMorePosts(post, slug);
  const __html = post.__html;
  const { metadata, timeToRead, date } = post;
  const tags =
    typeof metadata.tags === 'string' ? metadata.tags.split(',') : [];

  return { metadata, date, morePosts, series, __html, tags, timeToRead };
}

export async function Head(_: undefined, { store, route }: RequestContext) {
  const post = await loadPostData(route);
  store.set('post', post);

  return null;
}

export const prerender = async () => {
  const POST_PATH = path.join(process.cwd(), 'src', 'posts');
  const files = fs.readdirSync(POST_PATH).map(clearPage);
  return files.map((slug) => ({ slug }));
};
