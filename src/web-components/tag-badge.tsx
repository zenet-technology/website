interface Props {
  label: string;
  key?: string;
  q?: string;
}

export default function TagBadge({ key, label, q = '' }: Props) {
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
      class={`text-nowrap bg-secondary-300 text-tertiary-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-tertiary-700 dark:text-secondary-300 border hover:text-primary ${isActive ? 'text-tertiary border-tertiary-700 border-secondary-300' : 'border-secondary-300 dark:border-tertiary-700'}`}
    >
      {label}
    </a>
  );
}
