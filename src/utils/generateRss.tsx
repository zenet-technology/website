import fs from 'node:fs';
import path from 'node:path';
import clearPage from './clearPage';
import readPost from './readPost';

const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');
const PUBLIC_FILE = path.join(process.cwd(), 'src', 'public', 'rss.xml');

async function generateRss() {
  const posts = fs.readdirSync(POSTS_PATH).map(clearPage);
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="https://zenettechnology.com/rss.xml" rel="self" type="application/rss+xml" />
        <title>Zenet Technology Pte. Ltd.</title>
        <description>Zenet Technology Pte. Ltd. official web site.</description>
        <link>https://zenettechnology.com</link>
        <lastBuildDate>${new Date().toString()}</lastBuildDate>
      ${(
        await Promise.all(
          posts.map(async (post: string) => {
            const { metadata, __html } = readPost(post);
            const content = (await __html)
              // Absoulte path for images and links
              // https://validator.w3.org/feed/docs/warning/ContainsRelRef.html
              .replace(/src="\//g, 'src="https://zenettechnology.com/')
              .replace(/href="\//g, 'href="https://zenettechnology.com/')
              // Not iframes
              // https://validator.w3.org/feed/docs/warning/SecurityRisk.html
              .replace(/<iframe.*<\/iframe>/g, '');

            return `
            <item>
              <title>${metadata.title}</title>
              <description>${metadata.description}</description>
              <link>https://zenettechnology.com/blog/${post}</link>
              <guid isPermaLink="false">https://zenettechnology.com/blog/${post}/</guid>
              ${typeof metadata.created === 'string' || typeof metadata.created === 'number' || metadata.created instanceof Date ? `<pubDate>${new Date(metadata.created).toString()}</pubDate>` : ''}
              <content:encoded><![CDATA[${content}]]></content:encoded>
            </item>`;
          }),
        )
      ).join('')}
      </channel>
    </rss>`;

  fs.writeFileSync(PUBLIC_FILE, rss);
}

console.log('Generating RSS...');
generateRss();
