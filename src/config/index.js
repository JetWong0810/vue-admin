const Config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  stagnateTime: 7 * 24 * 60 * 60 * 1000, // 无操作停滞时间  默认7天
  openAutoJumpOut: true, // 是否开启无操作跳出
  notLoginRoute: ['Login'], // 无需登录即可访问的路由 name,
  sideBarLevel: 3, // 侧边栏层级限制, 3表示三级, 可设置 2 和 3
  defaultRoute: '/', // 默认打开的路由
  useFrontEndErrorMsg: false, // 默认采用后端返回异常
  isMock: false // 是否mock数据
}

export default Config
