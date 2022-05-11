import store from '@/store'
import commonConf from '@/data/common-conf'
import * as DataConf from '@/data'

const Common = {}

/**
 * 注册eventBus事件
 */
Common.registerBusEvent = (self, eventName, callback) => {
  self.eventBus.$off(eventName)
  self.eventBus.$on(eventName, self[callback])
}

/**
 * 发送给对应监听事件
 */
Common.emitToEvent = (self, eventName, params) => {
  self.eventBus.$emit(eventName, params)
}

/**
 * 获取mock数据
 */
Common.getMockData = () => {
  const pageName = store.state.pageName
  const tableColumn = DataConf[pageName].tableColumn
  const mockConf = { 'id|+1': 1 }
  tableColumn.map(item => {
    if (item.mockVal) {
      mockConf[item.prop] = item.mockVal
    } else if (item.mockList) {
      mockConf[item.prop + '|1'] = getList(item.mockList)
    }
  })
  const listData = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [mockConf]
  })
  // 输出结果
  const result = { data: { list: listData.list, total: 40 } }

  return result
}

// 获取下拉列表
function getList(key) {
  return Object.values(commonConf[key])
}

export default Common
