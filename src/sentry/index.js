// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
// https://docs.sentry.io/clients/javascript/integrations/vue/
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import {
  version,
} from '~/package.json';

const {
  NODE_ENV,
} = process.env;

if (NODE_ENV === 'production') {
  // Configure your sentry url.
  // https://docs.sentry.io/
  const SENTRY_URL = '';
  if (SENTRY_URL) {
    Raven
      .config(SENTRY_URL, {
        environment: NODE_ENV,
        release: version,
      })
      .addPlugin(RavenVue, Vue)
      .install();

    // https://docs.sentry.io/clients/javascript/#manually-reporting-errors
    // Raven.captureException(new Error('Raven Test.'));
  }
}
