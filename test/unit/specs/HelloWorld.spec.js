// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';

import '@/logger';
import '@/sentry';
import '@/iview';
import '@/click_outside';
import store from '@/store';
import i18n from '@/i18n';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor({
      i18n,
      store,
    }).$mount();

    expect(vm.$el.querySelector('.hello h1').textContent).toEqual('Welcome to Your Vue.js App');
  });
});
