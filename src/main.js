import 'whatwg-fetch';
import 'Src/vue';
import 'Src/logger';
import 'Src/sentry';
import 'Src/iview';
import 'Src/click_outside';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
import store from 'Src/store';
import i18n from 'Src/i18n';
import App from 'Src/App.vue';
import router from 'Src/router';
import {name, version} from 'RootDir/package.json';

logger.info(`${name} v${version}`);

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
