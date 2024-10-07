import type { RequestContext } from 'brisa';

type Props = {
  key: string;
  title?: string;
  series: { title: string | undefined; slug: string }[];
  style?: Record<string, string | number>;
};

export default function BlogSeries(
  { key, title, series, style }: Props,
  { i18n, route: { query } }: RequestContext,
) {
  if (!series || !series.length) return null;

  return (
    title && (
      <div
        key={key}
        class="w-full my-8 rounded border-gray-300 shadow dark:bg-gray-700 dark:border-gray-700"
        style={style}
      >
        <div class="p-4 font-bold">
          {i18n.t('BLOG_SERIES', { title, length: series.length })}
        </div>
        {series.map((serie, index) => {
          if (!serie.title) return;

          const title = `${index + 1}) ${serie.title}`;
          const key = `serie-${serie.slug}`;

          if (serie.slug === query?.slug) {
            return (
              <div
                key={key}
                class="p-4 border-t border-t-gray-300 text-primary"
              >
                {title}
              </div>
            );
          }

          return (
            <a
              key={key}
              href={`/blog/${serie.slug}`}
              class="p-4 border-t border-t-gray-300"
            >
              {title}
            </a>
          );
        })}
      </div>
    )
  );
}
