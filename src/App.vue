<template>
  <div id="app">
    <Breadcrumb>
      <BreadcrumbItem
        to="/"
      >Home</BreadcrumbItem>
      <BreadcrumbItem
        to="/another"
      >Another</BreadcrumbItem>
    </Breadcrumb>
    <div id="wrapper">
      <div id="display-time">
        <Tag
          v-if="show"
          closable
          @on-close="handleClose"
        >{{ time }}</Tag>
      </div>
      <div id="language-chooser">
        <Tooltip
          placement="left"
          :content="changeLanguage"
        >
          <Select
            :value="$i18n.locale"
            @on-change="onChange"
          >
            <Option
              v-for="language in languages"
              :value="language"
              :key="language"
            >{{ language }}</Option>
          </Select>
        </Tooltip>
      </div>
      <div id="logo">
        <img src="./assets/logo.png">
      </div>
    </div>
    <router-view/>
    <Button
      id="ip-address"
      type="ghost"
      @click="fetchIp"
    >{{ fetchIpLabel }}</Button>
  </div>
</template>

<script>
import identity from 'lodash/identity';
import moment from 'moment';
import * as constants from '@/constants';
import '@/styles/App.css';

export default {
  name: 'App',

  data() {
    const data = {
      intervalId: null,
      show: true,
      updateTime: false,
    };

    data.intervalId = setInterval(() => {
      data.updateTime = !data.updateTime;
    }, 500);

    return data;
  },

  computed: {
    changeLanguage() {
      logger.log('computed changeLanguage called');

      identity(this.$i18n.locale);

      return this.$t('change-language');
    },

    fetchIpLabel() {
      logger.log('computed fetchIpLabel called');

      identity(this.$i18n.locale);

      if (this.ipStatus === constants.WAITING) {
        return this.$t('fetch-ip');
      }

      if (this.ipStatus === constants.REQUESTED) {
        return this.$t('fetch-requested');
      }

      if (this.ipStatus === constants.ERROR) {
        return this.$t('fetch-error');
      }

      return this.ipAddress;
    },

    ipAddress() {
      logger.log('computed ipAddress called');

      return this.$store.getters.ip;
    },

    ipStatus() {
      logger.log('computed ipStatus called');

      return this.$store.getters.status;
    },

    languages() {
      logger.log('computed language called');

      return Object.keys(this.$i18n.messages);
    },

    time() {
      if (!this.intervalId) {
        logger.error('computed time called');
      }

      identity(this.updateTime);

      const time = moment();

      time.locale(this.$i18n.locale);

      return time.format('LL, LTS');
    },
  },

  watch: {
    ipStatus() {
      logger.log('watch ipStatus called');

      if (this.ipStatus === constants.REQUESTED) {
        logger.log('watch ipStatus requested');

        return;
      }

      const isError = this.ipStatus === constants.ERROR;
      this.$Notice[isError ? 'error' : 'info']({
        desc: isError ? this.$t('fetch-error') : this.ipAddress,
        title: this.$t('received-ip'),
      });
    },
  },

  methods: {
    fetchIp() {
      logger.info('Requested fetch.');
      this.$store.dispatch('ip');
    },

    handleClose() {
      logger.info('Closed clock.');
      this.show = false;
      clearInterval(this.intervalId);
    },

    onChange(value) {
      logger.info(`Language selected ${value}`);
      this.$i18n.locale = value;
      this.$Message.info({
        content: this.$t('changed-language-to'),
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

#language-chooser {
  float: right;
  width: 33%;
}

#display-time {
  float: left;
  width: 33%;
  min-height: 1px;
}

#ip-address {
  margin: 20px 0;
}
</style>
