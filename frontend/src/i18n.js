import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';

const i18n = () => {
  i18next
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'ru',
      resources,
    });
};

export default i18n;
