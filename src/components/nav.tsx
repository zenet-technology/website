import type { RequestContext } from 'brisa';

export default function Nav(
  _: Record<string, undefined>,
  { i18n, route }: RequestContext,
) {
  const navigation = [
    { href: '', name: i18n.t('HOME') },
    { href: '/about-us', name: i18n.t('ABOUT_US') },
    { href: '/blog', name: i18n.t('BLOG') },
    { href: '#contact', name: i18n.t('CONTACT') },
  ];

  return (
    <header class="fixed top-0 w-screen z-10 shadow bg-white dark:bg-black dark:border-b dark:border-gray-700">
      <div class=" max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <logo-full-light class="hidden dark:block h-8" />
          <logo-full-dark class="dark:hidden h-8" />
        </a>
        <nav-menu
          currentPage={route.pathname}
          navigation={navigation.map((nav) => ({
            name: nav.name,
            href: `/${i18n.locale}${nav.href}`,
          }))}
        />
      </div>
      <nav id="menu" />
    </header>
  );
}
