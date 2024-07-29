import fs from 'node:fs';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import matter from 'gray-matter';
import path from 'node:path';
import readingTime from 'reading-time';
import hljs from 'highlight.js';
import niceDateText from './niceDateText';
import type { Metadata } from './getAllPosts';

export type PostContent = {
  metadata: Metadata;
  date: string;
  __html: string | Promise<string>;
  timeToRead: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

const POST_PATH = path.join(process.cwd(), 'src', 'posts');

/**
 * Read post converting markdown to HTML + metadata
 */
export default function readPost(slug: string): PostContent {
  const markdownWithMetadata = fs
    .readFileSync(path.join(POST_PATH, `${slug}.md`))
    .toString();

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  const { data, content } = matter(markdownWithMetadata);

  return {
    metadata: data,
    date: niceDateText(new Date(data.created)),
    __html: marked.parse(content),
    timeToRead: readingTime(content),
  };
}
