import type { RequestContext } from 'brisa';

export default function Footer(
  _: Record<string, undefined>,
  { i18n }: RequestContext,
) {
  const date = new Date().getFullYear().toString();
  const links = [
    { link: '/privacy', label: i18n.t('PRIVACY_POLICY'), header: false },
    { link: '/cookies', label: i18n.t('COOKIES_POLICY'), header: false },
  ];

  return (
    <footer
      class={
        'flex flex-col items-center p-4 dark:bg-gray-700 bg-white dark:text-gray-300 text-gray-700'
      }
    >
      <logo-full-light class="hidden dark:block h-8 mb-4" />
      <logo-full-dark class="dark:hidden h-8 mb-4" />
      <div class="mb-4">
        {links.map((link) => (
          <a key={link.label} href={link.link} class="p-4">
            {link.label}
          </a>
        ))}
      </div>
      <hr class={'border-primary-500 mb-4 w-4/5'} />
      <p class="text-center">{i18n.t('FOOTER.COPYRIGHT', { date })}</p>
    </footer>
  );
}
