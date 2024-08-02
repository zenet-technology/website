import pageBadges from 'js-paging';
import type { WebContext } from 'brisa';
import filterSearch from '@/utils/filterSearch';
import type { Post } from '@/utils/getAllPosts';

const itemsPerPage = 10;

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
    return filteredPosts.value?.slice(firstIndex, lastIndex);
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
          {postsToShow.value?.map?.(
            ({ slug, metadata, date, timeToRead }: Post) => (
              <a
                href={`/blog/${slug}`}
                key={slug}
                title={metadata.description}
                aria-label={metadata.description}
              >
                <article class="sm:flex justify-between mb-8 p-4 rounded border-gray-300 shadow dark:bg-gray-700 dark:border-gray-700">
                  <div class="sm:mr-4 sm:w-1/3">
                    {metadata.cover_image_mobile ? (
                      <img
                        loading="lazy"
                        src={metadata.cover_image_mobile}
                        alt={metadata.title}
                        style={{ viewTransitionName: `img:${slug}` }}
                        class="rounded"
                      />
                    ) : null}
                    <div class="mt-2 flex flex-wrap gap-2">
                      {metadata.tags?.split(',').map((tag) =>
                        Tag({
                          key: tag,
                          label: tag,
                          q: params.value?.q ?? '',
                        }),
                      )}
                    </div>
                  </div>
                  <div class="flex flex-col sm:w-2/3">
                    <h3
                      style={{ viewTransitionName: `title:${slug}` }}
                      class="mt-2 sm:mt-0"
                    >
                      {metadata.title}
                    </h3>
                    {PostInfo({
                      author: metadata.author,
                      authorLink: metadata.authorLink,
                      timeToRead,
                      date,
                    })}
                    <p class="font-light text-gray-500 dark:text-gray-400">
                      {metadata.description}
                    </p>
                    <div class="self-end inline-flex items-center">
                      {i18n.t('BLOG_READ_ARTICLE')}
                    </div>
                  </div>
                </article>
              </a>
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
            <div style={{ marginTop: 50, textAlign: 'center' }}>
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
          <div class="flex flex-wrap gap-2" style={{ marginTop: 10 }}>
            {tags.map((tag) =>
              Tag({
                key: tag,
                label: tag,
                q: params.value?.q ?? '',
              }),
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function PostInfo({
  date,
  timeToRead,
  hideAuthor,
  author,
  authorLink,
}: {
  author: string | undefined;
  authorLink: string | undefined;
  date: string;
  timeToRead: { text: string };
  hideAuthor?: boolean;
}) {
  const authorElement = hideAuthor ? null : (
    <>
      {'by '}
      <a href={authorLink ?? '/'}>{author}</a>
      {' on '}
    </>
  );

  return (
    <time datetime={date} class="text-sm text-gray-300 dark:text-gray-700">
      {authorElement}
      {`${date} • ${timeToRead.text.replace(/ /g, '\u00A0')}`}
    </time>
  );
}

function Tag({
  key,
  label,
  q = '',
}: {
  label: string;
  key?: string;
  q: string;
}) {
  const tag = label.toLowerCase();
  const pathname =
    typeof window === 'undefined' ? '' : new URL(location.href).pathname;
  const tags = q.split(' ').map((t) => t.toLowerCase());
  const isActive = tags.includes(tag);
  let href = `/blog?q=${label}`;

  if (pathname === '/blog') {
    href = q ? `${pathname}?q=${q}+${label}` : `/blog?q=${label}`;
  }

  if (isActive) {
    const q = tags.filter((t) => t !== tag).join('+');
    href = q ? `/blog?q=${q}` : '/blog';
  }

  function onTag(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    history.replaceState(null, '', href);
  }

  return (
    <a
      key={key}
      onClick={onTag}
      href={href}
      class={`bg-secondary-300 text-tertiary-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-tertiary-700 dark:text-secondary-300 border hover:text-primary ${isActive ? 'text-tertiary border-tertiary-700 border-secondary-300' : 'border-secondary-300 dark:border-tertiary-700'}`}
    >
      {label}
    </a>
  );
}
