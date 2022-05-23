import Vue from 'vue'
import Router from 'vue-router'
import appConfig from '@/config/index'
import routes from './route'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // 登录验证
  // const { notLoginRoute } = appConfig
  // if (!notLoginRoute.includes(to.name) && !store.state.logined) {
  //   next({ path: '/login' })
  //   return
  // }
  console.log(to, from)

  // 路由发生变化重新计时
  Vue.prototype.$_logout_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 设置当前页pageName/currentMenu
  store.commit('SET_PAGENAME', to.name)
  // store.commit('SET_CURRENT_MENU', to.name)

  next()
})

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

export default router
