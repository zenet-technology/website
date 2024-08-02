import type { RequestContext } from 'brisa';

export default function NotFound(_: undefined, { i18n }: RequestContext) {
  return (
    <section class="container text-center mx-auto max-w-5xl px-4 lg:px-6 pt-8 lg:pt-16">
      <h1 class="text-4xl font-bold">{i18n.t('NOT_FOUND.TITLE')}</h1>
      <h2 class="font-light text-gray-500 text-base sm:text-lg dark:text-gray-400 mb-12">
        {i18n.t('NOT_FOUND.DESCRIPTION')}
      </h2>
    </section>
  );
}
