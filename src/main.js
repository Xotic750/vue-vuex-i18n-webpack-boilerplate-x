// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';

import '@/logger';
import '@/sentry';
import '@/iview';
import '@/click_outside';
import store from '@/store';
import i18n from '@/i18n';
import App from '@/App.vue';
import router from '@/router';
import {
  name,
  version,
} from '~/package.json';

logger.info(`${name} v${version}`);

Vue.config.silent = process.env.NODE_ENV === 'production';
Vue.config.productionTip = !Vue.config.silent;

// Initialise the vue app.
export default new Vue({
  el: '#app',

  i18n,

  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,

  router,

  components: {
    App,
  },

  template: '<App/>',
});
