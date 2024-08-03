import { clear } from './clear';

/**
 * @todo Simplify using regex?
 */
export default function filterSearch(search = '') {
  return ({
    metadata,
  }: {
    metadata?: { title?: string; description?: string; tags?: string };
  }) => {
    const {
      title: t = '',
      description: d = '',
      tags: ts = '',
    } = metadata ?? {
      metadata: {
        title: '',
        description: '',
        tags: '',
      },
    };
    const words = [...t.split(' '), ...d.split(' '), ...ts.split(',')].map(
      clear,
    );
    const wordsToSearch = search.split(' ').map(clear);

    return wordsToSearch.every((word) => words.some((w) => w.includes(word)));
  };
}
