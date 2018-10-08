// https://vuejs.org/v2/guide/installation.html
import Vue from 'vue';
import 'Src/logger';
import 'Src/sentry';
import 'Src/iview';
import 'Src/click_outside';
import store from 'Src/store';
import i18n from 'Src/i18n';
import HelloWorld from 'Src/components/HelloWorld.vue';

describe('helloWorld.vue', () => {
  it('should render correct contents', () => {
    expect.assertions(1);
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor({
      i18n,
      store,
    }).$mount();

    expect(vm.$el.querySelector('.hello h1').textContent).toStrictEqual('Welcome to Your Vue.js App');
  });
});
