<template>
  <div id="app"><router-view v-if="isRouterAlive" /></div>
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue'

export default {
  data() {
    return {
      timer: null,
      eventBus: new Vue(),
      isRouterAlive: true
    }
  },
  mounted() {
    document.getElementById('loader').style.display = 'none'
  },
  provide() {
    return {
      eventBus: this.eventBus, // 组件通信
      reload: this.reload // 页面刷新
    }
  },
  methods: {
    ...mapActions(['loginOut']),
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition-delay: 99999s;
    transition: color 99999s ease-out, background-color 99999s ease-out;
  }
}
</style>
