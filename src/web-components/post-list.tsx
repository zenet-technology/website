import pageBadges from 'js-paging';
import type { WebContext } from 'brisa';
import filterSearch from '@/utils/filterSearch';
import type { Post } from '@/utils/getAllPosts';

const itemsPerPage = 5;

export default function PostList(
  { tags }: { tags: string[] },
  { i18n, store, params, derived }: WebContext,
) {
  const filteredPosts = derived(() =>
    params.value?.q
      ? store.get<Post[]>('posts').filter(filterSearch(params.value?.q))
      : store.get<Post[]>('posts'),
  );
  const currentPage = derived(() => Number(params.value?.page || 1));
  const pages = derived(() =>
    Math.ceil(filteredPosts.value?.length / itemsPerPage),
  );
  const postsToShow = derived(() => {
    const lastIndex = itemsPerPage * currentPage.value;
    const firstIndex = lastIndex - itemsPerPage;
    return filteredPosts.value?.slice(firstIndex, lastIndex) ?? [];
  });

  return (
    <section class="container mx-auto max-w-5xl px-4 lg:px-6 py-8 lg:py-16">
      <hgroup class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h1 class="text-4xl font-bold">{i18n.t('BLOG')}</h1>
        <p class="font-light text-gray-500 text-base sm:text-lg dark:text-gray-400">
          {i18n.t('BLOG_SUBTITLE')}
        </p>
        <p>{i18n.t('BLOG_POSTS', { posts: filteredPosts.value?.length })}</p>
      </hgroup>

      <div class="flex flex-col md:flex-row gap-4 flex-col-reverse">
        <div class="flex-auto">
          {postsToShow.value.map(
            ({ slug, metadata, date, timeToRead }: Post) => (
              <post-card
                key={slug}
                slug={slug}
                metadata={metadata}
                date={date}
                timeToRead={timeToRead}
                query={params.value?.q ?? ''}
              />
            ),
          )}

          {pages.value > 1 && (
            <div class="paginator">
              {pageBadges({
                currentPage: currentPage.value,
                pages: pages.value,
              }).map((num: number | null) =>
                num ? (
                  <a
                    key={`page-${num}`}
                    href={`/blog?q=${params.value?.q || ''}&page=${num}`}
                    class={`badge ${num === currentPage.value ? 'current' : ''}`}
                  >
                    {num}{' '}
                  </a>
                ) : (
                  <span key={`separator-${num}`} class="separator">
                    ...
                  </span>
                ),
              )}
            </div>
          )}

          {filteredPosts.value?.length === 0 && (
            <div class="text-center">
              {i18n.t('BLOG_CANT_FIND')}{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/search?q=site:zenettechnology.com+${params.value?.q ?? ''}`}
              >
                Google
              </a>
              .
            </div>
          )}
        </div>
        <aside class="md:sticky w-full md:max-w-[320px]">
          <input
            class="w-full mb-4"
            value={params.value?.q ?? ''}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const q = input.value;
              history.replaceState(null, '', `/blog?q=${q}`);
            }}
            aria-label={i18n.t('BLOG_POST_SEARCH')}
            placeholder={i18n.t('BLOG_POST_SEARCH')}
            type="text"
          />
          <div class="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <tag-badge key={tag} label={tag} q={params.value?.q} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
