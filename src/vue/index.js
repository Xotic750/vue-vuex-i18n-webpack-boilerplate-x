import Vue from 'vue';

const isProduction = process.env.NODE_ENV === 'production';

// https://vuejs.org/v2/api/#Global-Config
Object.assign(Vue.config, {
  devtools: !isProduction,
  performance: false,
  productionTip: !isProduction,
  silent: isProduction,
});
