import type { I18nConfig } from 'brisa';
import en from './messages/en';

const i18nConfig: I18nConfig<typeof en> = {
  locales: ['en'],
  defaultLocale: 'en',
  messages: { en },
};

export default i18nConfig;
