module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['vue'],
  globals: {
    _: true,
    $: true,
    Mock: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    // 'max-len': 0, // 不限制一行最大长度
    // camelcase: 0, // 变量可以用下划线
    // 'no-plusplus': 0, // 禁止使用++，--
    'guard-for-in': 0, // 允许for in循环数组
    'import/extensions': 0, // import不需要写文件扩展名
    // 'no-underscore-dangle': 0, // 允许使用前置下划线 如 _test
    // 'no-restricted-syntax': 0, // 允许使用特定语法
    // 'consistent-return': 'off', // 允许函数/闭包可以不return返回
    // semi: ['error', 'never'], // 语句结尾统一不加分号
    // 'no-prototype-builtins': 'off', // 允许使用内建的Object.prototypes
    // 'template-curly-spacing': 'off', // 允许模板字面量花括号里出现括号
    eqeqeq: 'off', // 关闭使用全等
    // 'linebreak-style': [0, 'error', 'windows'], // 统一换行风格，windows下关闭
    'arrow-parens': ['error', 'as-needed'], // 允许箭头函数参数在需要时才加括号
    // 'no-param-reassign': ['error', { props: false }], // 允许对函数参数重新赋值
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 本地/测试允许console，正式不允许console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 本地/测试允许debugger，正式不允许debugger
    // indent: [
    //   // 强制执行一致的缩进
    //   'warn',
    //   2,
    //   {
    //     ignoredNodes: ['TemplateLiteral'],
    //     SwitchCase: 1,
    //   },
    // ],
    'object-curly-newline': [
      // object对象花括号不允许单独一行
      'error',
      {
        ImportDeclaration: 'never'
      }
    ],
    'comma-dangle': [2, 'never'], // 最后一个属性是不需要逗号
    'array-callback-return': 'off', // 关闭数组函数没有return的告警
    'global-require': 'off', // 允许使用require
    radix: 'off', //  parseInt允许不带进制
    'vue/multi-word-component-names': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
