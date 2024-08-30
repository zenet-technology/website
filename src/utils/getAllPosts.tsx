import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime, { type ReadTimeResults } from 'reading-time';
import niceDateText from './niceDateText';

export type Metadata = {
  [key: string]: unknown;
  title?: string;
  description?: string;
  created?: string | Date;
  tags?: string;
  coverImage?: string;
  coverImageMobile?: string;
  series?: string;
  author?: string;
  authorLink?: string;
  audio?: string;
  canonical?: string;
};

export type Post = {
  slug: string;
  metadata: Metadata;
  timeToRead: ReadTimeResults;
  date: string;
};

const isProd = process.env.NODE_ENV === 'production';
const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

export default function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((slug) => !slug.startsWith('draft-') || !isProd)
    .map((slug) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(POSTS_PATH, slug)),
      );
      return {
        slug: slug.replace('.md', ''),
        metadata: data,
        timeToRead: readingTime(content),
        date: niceDateText(new Date(data.created)),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.created).getTime() -
        new Date(a.metadata.created).getTime(),
    );
}
