import type { Configuration } from 'brisa';
import brisaTailwindCSS from 'brisa-tailwindcss';

export default {
  assetCompression: true,
  clustering: false,
  integrations: [brisaTailwindCSS()],
} satisfies Configuration;
