import { createPortal, type WebContext } from 'brisa';

interface Props {
  navigation: { href: string; name: string }[];
  currentPage: string;
}

export default function NavMenu(
  { navigation, currentPage }: Props,
  { state, onMount }: WebContext,
) {
  const portalElement = state<HTMLElement | null>(null);
  const isOpen = state(false);

  onMount(() => {
    portalElement.value = document.querySelector('nav[id="menu"]');
  });

  const getMenu = () => {
    return (
      <ul class="list-none font-light flex flex-col items-center rounded md:flex-row space-y-0 md:space-x-8 mb-0 md:mt-0 md:border-0 dark:border-gray-700">
        {navigation.map((item) => (
          <li key={item.name} class="w-full text-nowrap">
            <a
              href={item.href}
              class={`block rounded py-2 px-4 md:py-0 ${
                item.href === currentPage
                  ? 'bg-primary text-black md:bg-transparent md:text-primary'
                  : 'text-black hover:text-primary'
              }`.trim()}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex justify-center items-center w-8 h-8 text-sm rounded md:hidden active:text-primary"
        aria-controls="navbar-default"
        aria-expanded={isOpen.value}
        onClick={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        {isOpen.value ? (
          <>
            <span class="sr-only">Close main menu</span>ｘ
          </>
        ) : (
          <>
            <span class="sr-only">Open main menu</span>
            <icon-nav class="w-4 h-4 text-white hover:text-primary" />
          </>
        )}
      </button>
      <div class="w-full hidden md:block">{getMenu()}</div>
      {portalElement.value &&
        createPortal(
          <div
            class={`${isOpen.value ? 'block' : 'hidden'} w-full p-4 md:hidden`}
          >
            {getMenu()}
          </div>,
          portalElement.value,
        )}
    </>
  );
}
