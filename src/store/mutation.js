import * as types from './mutation-type'

export default {
  [types.SET_LOGINED](state) {
    state.logined = true
  },
  [types.SET_PAGENAME](state, payload) {
    state.pageName = payload
  }
}
