import Utils from '@/core/util/util'
import pluginsConfig from './plugin'
import flowConfig from './flow'
import systemConfig from './system'
// import exampleRouter from './example'

let homeRouter = [
  flowConfig,
  systemConfig,
  {
    title: '错误提示',
    type: 'view',
    name: 'error',
    route: '/error',
    filePath: 'views/error.vue',
    inNav: false
  }
]

const plugins = [...pluginsConfig]

// 筛除已经被添加的插件
function filterPlugin(data) {
  if (plugins.length === 0) {
    return
  }
  if (Array.isArray(data)) {
    data.forEach(item => {
      filterPlugin(item)
    })
  } else {
    const findResult = plugins.findIndex(item => data === item)
    if (findResult >= 0) {
      plugins.splice(findResult, 1)
    }
    if (data.children) {
      filterPlugin(data.children)
    }
  }
}

filterPlugin(homeRouter)

homeRouter = homeRouter.concat(plugins)

// 处理顺序
homeRouter = Utils.sortByOrder(homeRouter)

// 使用 Symbol 处理 name 字段, 保证唯一性
const deepReduceName = target => {
  if (Array.isArray(target)) {
    target.forEach(item => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
    return
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      // eslint-disable-next-line no-param-reassign
      target.name = target.name || Utils.getRandomStr()
    }

    if (Array.isArray(target.children)) {
      target.children.forEach(item => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

deepReduceName(homeRouter)

export default homeRouter
