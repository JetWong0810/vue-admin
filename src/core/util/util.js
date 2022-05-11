import { cloneDeep, throttle, debounce } from 'lodash'

const Util = {}

/** 参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
Util.cutString = (str, len) => {
  if (str.length * 2 <= len) {
    return str
  }
  let strlen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    s += str.charAt(i)
    if (str.charCodeAt(i) > 128) {
      strlen += 2
      if (strlen >= len) {
        return `${s.substring(0, s.length - 1)}...`
      }
    } else {
      strlen += 1
      if (strlen >= len) {
        return `${s.substring(0, s.length - 2)}...`
      }
    }
  }
  return s
}

/**
 * 简单数组的交集
 * @param {Array} a
 * @param {Array} b
 */
Util.getIntersect = (a, b) => {
  if (a.constructor === Array && b.constructor === Array) {
    const set1 = new Set(a)
    const set2 = new Set(b)
    return Array.from(new Set([...set1].filter(x => set2.has(x))))
  }
  return null
}

/**
 * 防抖函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Util.debounce = (func, wait = 50) => debounce(func, wait)

/**
 * 节流函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Util.throttle = (func, wait = 50) => throttle(func, wait)

/**
 * 返回 n 位的随机字符串
 * @param {Number} n
 */
Util.getRandomStr = (n = 6) => {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < n; i += 1) {
    str += chars.charAt(Math.floor(Math.random() * 62))
  }
  return str
}

Util.getTypeOf = obj => {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}

function insertItem(item, arr) {
  const { order } = item
  if (typeof arr[order] !== 'number') {
    arr[order] = item
    return
  }
  let moveBegin
  let moveEnd
  let pos
  let i = order + 1

  while (arr[i]) {
    if (arr[i].order > order) {
      if (!moveBegin) {
        moveBegin = i
        pos = i
      }
    }
    i += 1
  }

  if (moveBegin) {
    moveEnd = i
  } else {
    pos = i
  }

  if (!moveEnd) {
    arr[pos] = item
    return
  }

  // 需要移动
  for (let i = moveEnd; i >= moveBegin; i -= 1) {
    arr[i + 1] = arr[i]
  }
  arr[pos] = item
}

/**
 * 根据数组的 order 字段排序
 * @param {Array} source
 */
Util.sortByOrder = (source = []) => {
  if (!Array.isArray(source)) {
    console.error('sortByOrder 传入参数不符合要求, 应为数组', source)
    return source
  }
  const tmp = []
  let target = []

  // 将带排序的子项添加进临时数组 tmp
  for (let i = 0; i < source.length; i += 1) {
    if (typeof source[i].order !== 'number') {
      continue
    }
    let { order } = source[i]
    // 支持设置倒数顺序
    if (order < 0) {
      order = source.length + order
      if (order < 0) {
        order = 0
      }
    }

    // 确保整数
    source[i].order = Math.floor(order)

    // 插入临时数组
    insertItem(source[i], tmp)
  }

  // 合并临时数组和原数组
  for (let i = 0, j = 0; i < source.length; i += 1) {
    if (typeof source[i].order === 'number') {
      continue
    }
    // 找需要填的坑
    while (tmp[j]) {
      j += 1
    }
    tmp[j] = source[i]
  }
  // 筛除空隙
  target = tmp.filter(item => !!item)
  return target
}

/**
 * 深度遍历，深拷贝
 * @param {*} data
 */
Util.deepClone = data => cloneDeep(data)

/**
 * 中划线转驼峰
 */
Util.came = str => {
  return `${str}`.replace(/-\D/g, match => match.charAt(1).toUpperCase())
}

/**
 * 判断权限
 */
Util.hasPermission = (permissions, route, user) => {
  if (user && user.is_admin) {
    return true
  }
  if (route.permission) {
    return permissions.some(permission => route.permission == permission || route.permission.includes(permission))
  }
  return true
}

/**
 * 对象的深度合并
 */
Util.deepObjMerge = (obj1, obj2, cache) => {
  //防止死循环，这里需要把循环过的对象添加到数组中
  cache = !Array.isArray(cache) ? [] : cache
  //因为后面只对obj2进行遍历，所以这里只要判断obj2就可以了，如果obj2已经比较合并过了则直接返回obj2，否则在继续合并
  if (cache.indexOf(obj2) > 0) return obj2
  cache.push(obj2)
  var isPlain1 = Util.getTypeOf(obj1)
  var isPlain2 = Util.getTypeOf(obj2)
  //obj1或obj2中只要其中一个不是对象，则按照浅合并的规则进行合并
  if (isPlain1 != 'object' || isPlain2 != 'object') return Util.shallowMerge(obj1, obj2)
  //如果都是对象，则进行每一层级的递归合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)]
  keys.forEach(function (key) {
    obj1[key] = Util.deepObjMerge(obj1[key], obj2[key], cache) //这里递归调用
  })

  return obj1
}

/**
 * 对象的浅合并
 */
Util.shallowMerge = (obj1, obj2) => {
  var isPlain1 = Util.getTypeOf(obj1)
  var isPlain2 = Util.getTypeOf(obj2)
  //只要obj1不是对象，那么不管obj2是不是对象，都用obj2直接替换obj1
  if (isPlain1 != 'object') return obj2
  //走到这一步时，说明obj1肯定是对象，那如果obj2不是对象，则还是以obj1为主
  if (isPlain2 != 'object') return obj1
  //如果上面两个条件都不成立，那说明obj1和obj2肯定都是对象， 则遍历obj2 进行合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)]
  keys.forEach(function (key) {
    obj1[key] = obj2[key]
  })

  return obj1
}

/**
 * 通过值获取对象键名
 */
Util.FindKey = (value, data, compare = (a, b) => a === b) => {
  if (!value || !data) return false
  return Object.keys(data).find(k => compare(data[k], value))
}

/**
 * 对象属性比较大小排序
 */
Util.Compare = property => {
  return function (a, b) {
    const value1 = a[property]
    const value2 = b[property]
    return value1 - value2
  }
}

export default Util
