import { clear } from '@/utils/clear';
import type { WebContext } from 'brisa';

interface Props {
  label: string;
  path?: string;
  key?: string;
  q?: string;
}

export default function TagBadge(
  { path = '/', key, label, q = '' }: Props,
  { derived }: WebContext,
) {
  const isActive = derived(() => {
    const tag = clear(label);
    const tags = clear(q);

    return tags.search(tag) >= 0;
  });

  return (
    <a
      key={key}
      href={!isActive.value ? `${path}?q=${clear(label)}` : path}
      class={`text-nowrap bg-secondary-300 text-tertiary-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-tertiary-700 dark:text-secondary-300 border hover:text-primary ${isActive.value ? 'text-tertiary border-tertiary-700 border-secondary-300' : 'border-secondary-300 dark:border-tertiary-700'}`}
    >
      {label}
    </a>
  );
}
