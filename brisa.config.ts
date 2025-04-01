import type { Configuration } from 'brisa';
import brisaTailwindCSS from 'brisa-tailwindcss';

export default {
  output: 'static',
  assetCompression: true,
  clustering: false,
  integrations: [brisaTailwindCSS()],
} satisfies Configuration;
