import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from 'Src/components/HelloWorld.vue';
import Another from 'Src/components/Another.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/another',
      name: 'Another',
      component: Another,
    },
  ],
});
