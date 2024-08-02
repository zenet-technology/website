import type { WebContext } from 'brisa';
import type { Metadata } from '@/utils/getAllPosts';

interface Props {
  slug: string;
  metadata: Metadata;
  date: string;
  timeToRead: { text: string };
  key?: string;
  query?: string;
}

export default function PostCard(
  { key, slug, metadata, timeToRead, date, query = '' }: Props,
  { i18n }: WebContext,
) {
  console.log({ key, slug, metadata, timeToRead, date, query });
  return (
    <a
      href={`/blog/${slug}`}
      key={key}
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
            {metadata.tags?.split(',').map((tag) => (
              <tag-badge key={tag} label={tag} q={query} />
            ))}
          </div>
        </div>
        <div class="flex flex-col sm:w-2/3">
          <h3
            style={{ viewTransitionName: `title:${slug}` }}
            class="mt-2 sm:mt-0"
          >
            {metadata.title}
          </h3>
          <post-info
            author={metadata.author}
            authorLink={metadata.authorLink}
            timeToRead={timeToRead}
            date={date}
          />
          <p class="font-light text-gray-500 dark:text-gray-300">
            {metadata.description}
          </p>
          <div class="self-end inline-flex items-center">
            {i18n.t('BLOG_READ_ARTICLE')}
          </div>
        </div>
      </article>
    </a>
  );
}
