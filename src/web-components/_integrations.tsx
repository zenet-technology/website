import type { WebContext, WebContextPlugin } from 'brisa';

function paramsPlugin(ctx: WebContext) {
  Object.assign(ctx, {
    get params() {
      const params = ctx.state<{ [k: string]: string }>();

      ctx.effect(() => {
        params.value = Object.fromEntries(
          new URLSearchParams(window.location.search).entries(),
        );

        const navigate = (e: { destination: { url: string | URL } }) => {
          params.value = Object.fromEntries(
            new URL(e.destination.url).searchParams.entries(),
          );
        };

        window.navigation?.addEventListener('navigate', navigate);
        ctx.cleanup(() =>
          window.navigation?.removeEventListener('navigate', navigate),
        );
      });

      return params;
    },
  });

  return ctx;
}

export const webContextPlugins: WebContextPlugin[] = [paramsPlugin];
