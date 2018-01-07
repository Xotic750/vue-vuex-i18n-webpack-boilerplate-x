// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
// http://kazupon.github.io/vue-i18n/en/installation.html
import VueI18n from 'vue-i18n';
// https://www.iviewui.com/docs/guide/i18n-en
import iViewLocaleEn from 'iview/dist/locale/en-US';
import iViewLocaleSv from 'iview/dist/locale/sv-SE';

import localeEn from './locale/en-US';
import localeSv from './locale/sv-SE';

// Locale messages.
const messages = {
  en: ({
    ...iViewLocaleEn,
    ...localeEn,
  }),
  sv: ({
    ...iViewLocaleSv,
    ...localeSv,
  }),
};

const {
  NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === 'production';

Vue.config.silent = isProduction;
Vue.config.productionTip = !isProduction;

Vue.use(VueI18n);

// Create VueI18n instance with options.
export default new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});
