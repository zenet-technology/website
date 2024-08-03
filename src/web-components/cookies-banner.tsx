import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import type { WebContext } from 'brisa';

export default function CookiesBanner(
  _: undefined,
  { state, onMount }: WebContext,
) {
  const showBanner = state(false);

  onMount(() => {
    showBanner.value = getCookie('cookies_enabled') === null;
  });

  const onYes = () => {
    setCookie('cookies_enabled', 'true');
    showBanner.value = false;
  };

  const onNo = () => {
    deleteCookie('sb_uid');
    deleteCookie('_ga');
    deleteCookie('_gat');
    deleteCookie('_gid');

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
          <p>We use cookies to improve your experience and for marketing.</p>
          <a
            href="/apps/web/app/cookies"
            class="pb-4 text-primary-700 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-300"
          >
            See our cookie policy.
          </a>
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <button
          type="button"
          class="px-4 py-3 rounded-none text-gray-700 bg-gray-300 hover:bg-gray-400 duration-150"
          onClick={onNo}
        >
          No thanks
        </button>
        <button
          type="button"
          class="flex-1 px-4 py-3 rounded-none bg-primary-500 hover:bg-primary-300 dark:hover:bg-primary-700 text-gray-700 duration-150"
          onClick={onYes}
        >
          Yeah, I&apos;m happy
        </button>
      </div>
    </div>
  );
}
