import tailwindcss from '@tailwindcss/postcss';
import type { Configuration } from 'brisa';
import type { BunPlugin } from 'bun';
import postcss from 'postcss';

const styleFilter = /.\.(css)$/;

export const cssPlugin: BunPlugin = {
  name: 'CSS Loader',
  setup(build) {
    build.onLoad({ filter: styleFilter }, async (args) => {
      const css = await Bun.file(args.path).text();
      const result = await postcss([tailwindcss]).process(css, {
        from: args.path,
      });

      return {
        contents: result.css.replaceAll(':root', ':root, :host'),
        loader: 'text',
      };
    });
  },
};

export default {
  output: 'static',
  assetCompression: true,
  extendPlugins(plugins) {
    return [...plugins, cssPlugin];
  },
} satisfies Configuration;
