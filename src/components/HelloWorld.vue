<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ essentialLinks }}</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
        >
          Twitter
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import identity from 'lodash/identity';

export default {
  name: 'HelloWorld',

  computed: {
    essentialLinks() {
      identity(this.$i18n.locale);

      return this.$tc('essential-links', 2);
    },

    msg() {
      identity(this.$i18n.locale);

      return this.$t('message');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~Src/styles/HelloWorld.less';

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
