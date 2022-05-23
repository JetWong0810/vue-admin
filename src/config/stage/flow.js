const flowRouter = {
  name: null,
  title: '流程管理',
  type: 'folder', // 类型: folder, tab, view
  icon: '/flow',
  filePath: 'view/flow/',
  route: '/flow',
  order: 3,
  inNav: true,
  permission: ['flow', 'admin'],
  children: [
    {
      title: '合同流程管理',
      type: 'tab',
      name: null,
      route: '/flow/contract/list',
      filePath: 'view/flow/contract/',
      inNav: true,
      permission: ['flow-contract', 'admin'],
      children: [
        {
          title: '合同流程列表',
          type: 'view',
          name: 'contractFlowList',
          route: '/flow/contract/list',
          filePath: 'view/flow/contract/list.vue',
          inNav: false,
          permission: ['flow-contract-list', 'admin']
        },
        {
          title: '合同流程配置',
          type: 'view',
          name: 'contractFlowSet',
          inNav: false,
          route: '/flow/contract/edit',
          filePath: 'view/flow/contract/edit.vue',
          permission: ['flow-contract-edit', 'admin']
        },
        {
          title: '合同流程测试',
          type: 'view',
          name: 'contractFlowTest',
          inNav: false,
          route: '/flow/contract/test',
          filePath: 'view/flow/contract/test.vue',
          permission: ['flow-contract-test', 'admin']
        }
      ]
    },
    {
      title: '请款流程管理',
      type: 'tab',
      name: null,
      route: '/flow/loan/list',
      filePath: 'view/flow/loan/',
      inNav: false,
      permission: ['flow-loan', 'admin'],
      children: [
        {
          title: '请款流程列表',
          type: 'view',
          name: 'loanFlowList',
          route: '/flow/loan/list',
          filePath: 'view/flow/loan/list.vue',
          inNav: false,
          permission: ['flow-loan-list', 'admin']
        },
        {
          title: '请款流程配置',
          type: 'view',
          name: 'loanFlowSet',
          inNav: false,
          route: '/flow/loan/edit',
          filePath: 'view/flow/loan/edit.vue',
          permission: ['flow-loan-edit', 'admin']
        }
      ]
    },
    {
      title: '报销流程管理',
      type: 'tab',
      name: null,
      route: '/flow/expense/list',
      filePath: 'view/flow/expense/',
      inNav: false,
      permission: ['flow-expense', 'admin'],
      children: [
        {
          title: '报销流程列表',
          type: 'view',
          name: 'expenseFlowList',
          route: '/flow/expense/list',
          filePath: 'view/flow/expense/list.vue',
          inNav: false,
          permission: ['flow-expense-list', 'admin']
        },
        {
          title: '报销流程配置',
          type: 'view',
          name: 'expenseFlowSet',
          inNav: false,
          route: '/flow/expense/edit',
          filePath: 'view/flow/expense/edit.vue',
          permission: ['flow-expense-edit', 'admin']
        }
      ]
    }
  ]
}
export default flowRouter
