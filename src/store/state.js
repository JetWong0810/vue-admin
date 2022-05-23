import stageConfig from '@/config/stage' // 引入舞台配置

export default {
  logined: false, // 是否登录
  token: '', // 校验token
  user: {}, // 用户信息
  pageName: '', // 当前页面名称
  commonConf: {}, // 通用缓存配置
  permissions: [], // 用户权限
  stageConfig // 舞台配置
}
