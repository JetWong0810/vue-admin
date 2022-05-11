const Validator = {}

/**
 * 验证金额数字(包含千分符,小数位)
 */
Validator.validateAmount = (rule, value, callback) => {
  let reg1 = /^\d*\.?\d{0,2}$/
  let reg2 = /^(([1-9][0-9]{0,2}(,\d{3})*)|0)(\.\d{1,2})?$/
  if (value === '') {
    callback(new Error('请输入账单金额'))
  } else if (!reg1.test(value) && !reg2.test(value)) {
    callback(new Error('账单金额格式不正确'))
  } else {
    callback()
  }
}

/**
 * 验证人天(一位小数)
 */
Validator.validateDay = (rule, value, callback) => {
  let reg = /^\d*\.?\d{0,1}$/
  if (value === '') {
    callback(new Error(rule.message))
  } else if (!reg.test(value)) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

export default Validator
