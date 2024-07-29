import type { Metadata } from '@/utils/getAllPosts';
import PostInfo from './post-info';
import type { ReadTimeResults } from 'reading-time';

type Props = {
  key: string;
  slug: string;
  metadata: Metadata;
  date: string;
  timeToRead: ReadTimeResults;
};

export default function PostItem({
  key,
  slug,
  metadata,
  date,
  timeToRead,
}: Props) {
  return (
    <a
      href={`/blog/${slug}`}
      key={key}
      class="post-list-item"
      title={metadata.description}
      aria-label={metadata.description}
    >
      <div class="image-wrapper">
        <img
          loading="lazy"
          height={50}
          width={110}
          src={metadata.cover_image_mobile}
          alt={metadata.title}
          style={{ viewTransitionName: `img:${slug}` }}
        />
      </div>
      <div class="info">
        <h2 style={{ viewTransitionName: `title:${slug}` }}>
          {metadata.title}
        </h2>
        {PostInfo({ timeToRead, date, hideAuthor: true })}
      </div>
    </a>
  );
}
