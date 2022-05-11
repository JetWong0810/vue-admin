import Vue from 'vue'
import Router from 'vue-router'
import appConfig from '@/config/index'
import routes from './route'
import store from '../store'

Vue.use(Router)

// 判断是否需要登录访问, 配置位于 config 文件夹
let isLoginRequired = routeName => {
  // 首次执行时缓存配置
  let { notLoginRoute } = appConfig
  const notLoginMark = {}

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true
    }
  }

  notLoginRoute = null // 释放内存

  // 重写初始化函数
  isLoginRequired = name => {
    if (!name) {
      return true
    }
    // 处理 Symbol 类型
    const target = typeof name === 'symbol' ? name.description : name
    return !notLoginMark[target]
  }

  return isLoginRequired(routeName)
}

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
  if (isLoginRequired(to.name) && !store.state.logined) {
    next({ path: '/login' })
    return
  }

  // 路由发生变化重新计时
  Vue.prototype.$_logout_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 设置当前页pageName
  store.commit('SET_PAGENAME', to.name)

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
