// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
// https://vuex.vuejs.org/en/installation.html
import Vuex from 'vuex';
import * as constants from 'Src/constants';

// If translations are required in the store.
// import i18n from 'Src/i18n';
// i18n.t('foo-bar');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ip: {
      status: constants.WAITING,
      value: null,
    },
  },
  getters: {
    ip(state) {
      const {value} = state.ip;

      logger.info('Get IP value', value);

      return value;
    },
    status(state) {
      const {status} = state.ip;

      logger.info('Get IP status', status);

      return status;
    },
  },
  mutations: {
    ip(state, ip) {
      logger.info('Set IP value', ip);

      return Reflect.set(state.ip, 'value', ip);
    },
    status(state, status) {
      logger.info('Set IP status', status);

      return Reflect.set(state.ip, 'status', status);
    },
  },
  actions: {
    ip(context) {
      logger.info('Performing IP fetch.');
      context.commit('status', constants.REQUESTED);
      context.commit('ip', null);

      const CONTENT_TYPE = 'content-type';
      const MIMETYPE_JSON = 'application/json';
      const FETCH_IP_URL = 'http://ip.jsontest.com/';

      // 'whatwg-fetch' will be automaticaly included as a polyfill by webpack.
      fetch(FETCH_IP_URL, {
        headers: new Headers({
          [CONTENT_TYPE]: MIMETYPE_JSON,
        }),
      })
        .then((response) => {
          if (response.ok) {
            const contentType = response.headers.get(CONTENT_TYPE);

            if (contentType && contentType.includes(MIMETYPE_JSON)) {
              return response.json();
            }

            logger.log(response);
            throw new TypeError('Expected JSON!');
          }

          logger.log(response);
          throw new Error('Network response was not ok!');
        })
        .then((pojo) => {
          logger.log('JSON response', pojo);
          context.commit('status', constants.READY);
          context.commit('ip', pojo.ip);

          return pojo;
        })
        .catch((err) => {
          logger.error(err);
          context.commit('status', constants.ERROR);
          context.commit('ip', null);
        });
    },
  },
});
