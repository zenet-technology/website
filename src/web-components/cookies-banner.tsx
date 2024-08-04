import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import type { WebContext } from 'brisa';

export default function CookiesBanner(
  _: undefined,
  { i18n, state, onMount }: WebContext,
) {
  const gaId = 'G-EEX9THLNQ9';
  const showBanner = state(false);

  onMount(() => {
    const cookiesEnabled = getCookie('cookies_enabled');
    showBanner.value = cookiesEnabled === null;

    // Definitions
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // biome-ignore lint/style/noArguments: This is by google documentation. I prefer to leave it as it is.
      window.dataLayer?.push(arguments);
    };
    window.consentGranted = () => {
      window.gtag('consent', 'update', {
        ad_personalization: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      });
    };
    window.consentDenied = () => {
      deleteCookie('sb_uid');
      deleteCookie('_ga');
      deleteCookie('_gat');
      deleteCookie('_gid');

      window.gtag('consent', 'update', {
        ad_personalization: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'denied',
      });
    };

    // Setting the configs
    window.gtag('js', new Date());
    window.gtag('config', gaId);
    if (cookiesEnabled === 'true') {
      window.consentGranted();
    } else {
      window.consentDenied();
    }

    // Loading GTAG Script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

    const firstScript = document.getElementsByTagName('script')[0];
    const headElement = document.getElementsByTagName('head')[0];
    headElement.insertBefore(gtagScript, firstScript);
  });

  const onYes = () => {
    window.consentGranted();
    setCookie('cookies_enabled', 'true');
    showBanner.value = false;
  };

  const onNo = () => {
    window.consentDenied();
    setCookie('cookies_enabled', 'false');
    showBanner.value = false;
  };

  return (
    <div
      class={`rounded-lg bg-white dark:bg-gray-700 shadow w-full sm:w-1/2 xl:w-1/4 max-w-[350px] overflow-hidden ${
        !showBanner.value ? 'hidden' : 'fixed right-4 bottom-4'
      }`}
    >
      <div>
        <svg
          class="absolute -top-16 -right-10 text-primary-500"
          width="120"
          height="119"
          viewBox="0 0 120 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>background</title>
          <path
            opacity="0.3"
            d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
            fill="currentColor"
          />
        </svg>
        <div class="flex flex-col px-4 pt-4">
          <p>{i18n.t('COOKIES.DESCRIPTION')}</p>
          <a
            href="/apps/web/app/cookies"
            class="pb-4 text-primary-700 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-300"
          >
            {i18n.t('COOKIES.PRIVACY')}
          </a>
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <button
          type="button"
          class="px-4 py-3 rounded-none text-gray-700 bg-gray-300 hover:bg-gray-400 duration-150"
          onClick={onNo}
        >
          {i18n.t('COOKIES.DENY')}
        </button>
        <button
          type="button"
          class="flex-1 px-4 py-3 rounded-none bg-primary-500 hover:bg-primary-300 dark:hover:bg-primary-700 text-gray-700 duration-150"
          onClick={onYes}
        >
          {i18n.t('COOKIES.GRANT')}
        </button>
      </div>
    </div>
  );
}
