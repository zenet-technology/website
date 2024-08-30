import filterSearch from '@/utils/filterSearch';
import type { Post } from '@/utils/getAllPosts';
import type { WebContext } from 'brisa';
import pageBadges from 'js-paging';

interface Props {
  path: string;
  tags: string[];
}

export default function PostList(
  { path, tags }: Props,
  { i18n, effect, cleanup, store, state, derived }: WebContext,
) {
  const itemsPerPage = 5;
  const currentPage = state(1);
  const currentSearch = state('');
  const filteredPosts = derived(
    () =>
      (currentSearch.value
        ? store
            .get<Post[] | null>('posts')
            ?.filter(filterSearch(currentSearch.value))
        : store.get<Post[] | null>('posts')) ?? [],
  );
  const pages = derived(() =>
    Math.ceil(filteredPosts.value.length / itemsPerPage),
  );

  const postsToShow = derived(() => {
    const lastIndex = itemsPerPage * currentPage.value;
    const firstIndex = lastIndex - itemsPerPage;
    return filteredPosts.value.slice(firstIndex, lastIndex) ?? [];
  });

  effect(() => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    );
    currentSearch.value = params.q ?? '';
    currentPage.value = Number(params.page ?? '1');

    const navigate = (e: { destination: { url: string } }) => {
      const params = Object.fromEntries(
        new URL(e.destination.url).searchParams.entries(),
      );
      currentSearch.value = params.q ?? '';
      currentPage.value = Number(params.page ?? '1');
    };

    window.navigation?.addEventListener('navigate', navigate);
    cleanup(() => window.navigation?.removeEventListener('navigate', navigate));
  });

  const onInput = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
    const q = e.currentTarget.value;
    currentSearch.value = q;
    history.replaceState(null, '', q ? `${path}?q=${q}` : path);
  };

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
                path={path}
                slug={slug}
                metadata={metadata}
                date={date}
                timeToRead={timeToRead}
                query={currentSearch.value}
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
                    href={`${path}?q=${currentSearch.value}&page=${num}`}
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
                href={`https://www.google.com/search?q=site:zenettechnology.com+${currentSearch.value}`}
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
            value={currentSearch.value}
            onInput={onInput}
            aria-label={i18n.t('BLOG_POST_SEARCH')}
            placeholder={i18n.t('BLOG_POST_SEARCH')}
            type="text"
          />
          <div class="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <tag-badge
                path={path}
                key={tag}
                label={tag}
                q={currentSearch.value}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
