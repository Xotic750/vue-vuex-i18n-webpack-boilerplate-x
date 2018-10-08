// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
// https://www.iviewui.com/docs/guide/start-en#Import_iView
import iView from 'iview';
// https://lodash.com/
import noop from 'lodash/noop';
import i18n from 'Src/i18n';

Vue.use(iView);
Vue.locale = noop;

// Required to enable iView translations.
iView.i18n((key, value) => i18n.t(key, value));
