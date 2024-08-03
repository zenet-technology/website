import fs from 'node:fs';
import path from 'node:path';
import { dangerHTML, type RequestContext } from 'brisa';
import type { MatchedRoute } from 'bun';

import clearPage from '@/utils/clearPage';
import getMorePosts from '@/utils/getMorePosts';
import readPost from '@/utils/readPost';
import BlogSeries from '@/components/blog-series';
// import getCanonical from '@/utils/getCanonical';

export default async function PostPage(
  _: undefined,
  { store, route, i18n }: RequestContext,
) {
  const { slug } = route.params;
  const { metadata, date, morePosts, series, __html, tags, timeToRead } =
    store.get('post') as Awaited<ReturnType<typeof loadPostData>>;

  return (
    <article class="container mx-auto max-w-5xl px-4 lg:px-6 pt-8 lg:pt-16">
      <hgroup class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h1
          style={{ viewTransitionName: `title:${slug}` }}
          class="text-4xl font-bold"
        >
          {metadata.title}
        </h1>
        <post-info
          author={metadata.author}
          date={date}
          timeToRead={timeToRead}
        />
      </hgroup>
      {metadata.coverImage && (
        <div key={slug} class="cover-image">
          <img
            loading="eager"
            src={metadata.coverImage}
            style={{
              viewTransitionName: `img:${slug}`,
              aspectRatio: '960/432',
            }}
            class="w-full rounded"
            alt={metadata.title}
          />
        </div>
      )}
      <div class="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <tag-badge key={tag} label={tag} />
        ))}
      </div>
      <p class="my-8 text-center font-light text-gray-500 text-base sm:text-lg dark:text-gray-400">
        {metadata.description}
      </p>
      <BlogSeries key="series-top" title={metadata.series} series={series} />
      <div class="my-8">{dangerHTML(await __html)}</div>
      <BlogSeries
        style={{ marginTop: 40 }}
        key="series-bottom"
        title={metadata.series}
        series={series}
      />
      {morePosts.length > 0 && (
        <div>
          <b class="block mb-4">{i18n.t('BLOG_SEE_MORE')}</b>
          {morePosts.map((morePost) => (
            <post-card
              key={morePost.slug}
              slug={morePost.slug}
              metadata={morePost.metadata}
              date={morePost.date}
              timeToRead={morePost.timeToRead}
            />
          ))}
        </div>
      )}
    </article>
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
