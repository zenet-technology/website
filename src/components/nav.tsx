import type { RequestContext } from 'brisa';

export default function Nav(
  _: Record<string, undefined>,
  { i18n, route }: RequestContext,
) {
  const navigation = [
    { href: '/', name: i18n.t('HOME') },
    { href: '/about-us', name: i18n.t('ABOUT_US') },
    { href: '/blog', name: i18n.t('BLOG') },
    { href: '#contact', name: i18n.t('CONTACT') },
  ];

  return (
    <header class="fixed w-screen z-10 shadow bg-white dark:bg-black dark:border-b dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <theme-image
            class="h-8"
            alt={'logo'}
            src="/logo/logo_full.svg"
            darkSrc="/logo/logo_full_white.svg"
          />
        </a>
        <nav-menu currentPage={route.pathname} navigation={navigation} />
      </div>
      <nav id="menu" />
    </header>
  );
}
