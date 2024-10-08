import type { RequestContext } from 'brisa';

export default function Contact(
  _: Record<string, undefined>,
  { i18n }: RequestContext,
) {
  return (
    <section class="w-full text-center p-4 rounded bg-primary">
      <div class="mb-4 text-xl font-bold font-headings">
        {i18n.t('GET_IN_TOUCH')}
      </div>
      <div>
        <a
          class="text-black hover:text-secondary"
          href={i18n.t('GET_IN_TOUCH_EMAIL_LINK')}
        >
          {i18n.t('GET_IN_TOUCH_EMAIL')}
        </a>
      </div>
    </section>
  );
}
