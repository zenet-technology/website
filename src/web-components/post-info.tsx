interface Props {
  author?: string;
  authorLink?: string;
  date: string;
  timeToRead: { text: string };
  hideAuthor?: boolean;
}

export default function PostInfo({
  date,
  timeToRead,
  hideAuthor,
  author,
  authorLink,
}: Props) {
  const authorElement =
    hideAuthor || !author ? null : (
      <>
        {'by '}
        <a href={authorLink ?? '/'}>{author}</a>
        {' on '}
      </>
    );

  return (
    <time datetime={date} class="text-sm text-gray-300 dark:text-gray-500">
      {authorElement}
      {`${date} • ${timeToRead.text.replace(/ /g, '\u00A0')}`}
    </time>
  );
}
