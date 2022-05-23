import * as types from './mutation-type'

export default {
  [types.SET_LOGINED](state) {
    state.logined = true
  },
  [types.SET_PAGENAME](state, payload) {
    state.pageName = payload
  },
  [types.SET_TOKEN](state, payload) {
    state.token = 'Bearer ' + payload
  },
  [types.REMOVE_TOKEN](state) {
    state.token = ''
  },
  [types.SET_USER](state, payload) {
    state.user = payload
  },
  [types.SET_COMMON_CONFIG](state, payload) {
    state.commonConf = payload
  }
}
