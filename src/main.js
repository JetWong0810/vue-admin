import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UmyUi from 'umy-ui'
import wl from 'wl-vue-select'

import '@/config/global'

import '@/core/mixin'
import '@/core/filter'
import '@/core/plugin'
import '@/core/directive'
import * as Util from '@/core/util'

import router from '@/router'
import store from '@/store'
import App from '@/app.vue'
import * as DataConf from '@/data'

import 'umy-ui/lib/theme-chalk/index.css'
import 'wl-vue-select/lib/wl-vue-select.css'
import '@/assets/style/index.scss'
import '@/assets/style/realize/element-variable.scss'
import 'element-ui/lib/theme-chalk/display.css'

Vue.prototype.$Util = Util
Vue.prototype.$DataConf = DataConf

Vue.use(ElementUI)
Vue.use(UmyUi)
Vue.use(wl)

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('Icon', Icon)

Vue.config.productionTip = false

/* eslint no-unused-vars: 0 */
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 设置 App 实例
export default AppInstance
