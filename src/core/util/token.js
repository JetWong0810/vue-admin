const Token = {}

/**
 * 存储access_token
 * @param {string} accessToken
 */
Token.saveToken = (tokenKey, tokenVal) => {
  localStorage.setItem(tokenKey, `Bearer ${tokenVal}`)
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
Token.getToken = (tokenKey = 'token') => {
  return localStorage.getItem(tokenKey)
}

/**
 * 移除token
 */
Token.removeToken = (tokenKey = 'token') => {
  localStorage.removeItem(tokenKey)
}
