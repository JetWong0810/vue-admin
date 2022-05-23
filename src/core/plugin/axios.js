// ajax 封装插件, 使用 axios
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router' // eslint-disable-line
import Config from '@/config'
import { baseApi } from '@/env'

const config = {
  baseURL: baseApi,
  timeout: 60 * 1000, // 请求超时时间设置 60s
  crossDomain: true,
  validateStatus(status) {
    return status >= 200 && status < 510
  }
}

// 创建请求实例
const _axios = axios.create(config)

_axios.interceptors.request.use(
  originConfig => {
    Vue.prototype.$_logout_jump()

    const reqConfig = { ...originConfig }

    // mock数据直接返回
    if (Config.isMock) {
      return reqConfig
    }

    if (!reqConfig.url) {
      Vue.prototype.$message({
        message: '无url请求地址，请检查！',
        type: 'error'
      })
    }

    if (!reqConfig.method) {
      reqConfig.method = 'get'
    }
    reqConfig.method = reqConfig.method.toLowerCase()

    // 如果是预览设置返回responseType xlsx预览为arraybuffer 其他预览为 blob
    if (reqConfig.url.indexOf('Preview') != -1 && reqConfig.params && reqConfig.params.fileType == 'xlsx') {
      reqConfig.responseType = 'arraybuffer'
    } else if (reqConfig.url.indexOf('Preview') != -1) {
      reqConfig.responseType = 'blob'
    }

    // 参数容错
    if (reqConfig.method === 'get') {
      if (!reqConfig.params) {
        reqConfig.params = reqConfig.data || {}
      }
    } else if (reqConfig.method === 'post') {
      if (!reqConfig.data) {
        reqConfig.data = reqConfig.params || {}
      }

      // 检测是否包含文件类型, 若包含则进行 formData 封装
      let hasFile = false
      Object.keys(reqConfig.data).forEach(key => {
        if (typeof reqConfig.data[key] === 'object') {
          const item = reqConfig.data[key]
          if (item instanceof FileList || item instanceof File || item instanceof Blob) {
            hasFile = true
          }
        }
      })
      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach(key => {
          formData.append(key, reqConfig.data[key])
        })
        reqConfig.data = formData
      }
    }
    const accessToken = store.state.token
    if (accessToken) {
      reqConfig.headers.Authorization = accessToken
    }
    return reqConfig
  },
  error => {
    Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  async res => {
    if (Config.isMock) {
      const mockData = Vue.prototype.$Util.Common.getMockData()
      return mockData
    }
    let { code, message } = res.data // eslint-disable-line
    if (code == '401') {
      store.dispatch('loginOut')
      router.push('/')
      return
    }
    if (res.status.toString().charAt(0) === '2') {
      return res.data
    }
    return new Promise((resolve, reject) => {
      // 第一种情况：默认直接提示后端返回的异常信息；特殊情况：如果本次请求添加了 handleError: true，用户自己try catch，框架不做处理
      if (res.config.handleError) {
        return reject(res)
      }
      // 第二种情况：采用前端自己的一套异常提示信息；特殊情况：如果本次请求添加了 showBackend: true, 弹出后端返回错误信息。
      // if (Config.useFrontEndErrorMsg && !res.config.showBackend) {
      //   // 弹出前端自定义错误信息
      //   const errorArr = Object.entries(ErrorCode).filter(v => v[0] === code.toString())
      //   // 匹配到前端自定义的错误码
      //   if (errorArr.length > 0 && errorArr[0][1] !== '') {
      //     message = errorArr[0][1] // eslint-disable-line
      //   } else {
      //     message = ErrorCode['777']
      //   }
      // }

      Vue.prototype.$message({
        message,
        type: 'error'
      })
      reject()
    })
  },
  error => {
    if (!error.response) {
      Vue.prototype.$message({
        message: '请检查 API 是否异常',
        type: 'error'
      })
      console.log('error', error)
    }

    // 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Vue.prototype.$message({
        type: 'warning',
        message: '请求超时'
      })
    }
    return Promise.reject(error)
  }
)

// eslint-disable-next-line
Plugin.install = function (Vue, options) {
  // eslint-disable-next-line
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

if (!Vue.axios) {
  Vue.use(Plugin)
}

export default _axios
