const systemRouter = {
  name: null,
  title: '系统管理',
  type: 'folder', // 类型: folder, tab, view
  icon: '/system',
  filePath: 'views/setting/',
  route: '/system',
  order: 2,
  inNav: true,
  permission: ['system', 'admin'],
  children: [
    {
      title: '组织管理',
      type: 'tab',
      name: null,
      route: '/setting/organization/list',
      filePath: 'views/setting/organization/',
      inNav: true,
      permission: ['system-organization', 'admin'],
      children: [
        {
          title: '用户列表',
          type: 'view',
          name: 'OrganizationList',
          route: '/setting/organization/list',
          filePath: 'views/setting/organization/list.vue',
          inNav: false,
          permission: ['system-organization-list', 'admin']
        },
        {
          title: '用户编辑',
          type: 'view',
          name: 'OrganizationEdit',
          inNav: false,
          route: '/setting/organization/edit',
          filePath: 'views/setting/organization/edit.vue',
          permission: ['system-organization-edit', 'admin']
        }
      ]
    },
    {
      title: '角色管理',
      type: 'tab',
      name: null,
      route: '/setting/role/list',
      filePath: 'views/setting/role/',
      inNav: true,
      permission: ['system-role', 'admin'],
      children: [
        {
          title: '角色列表',
          type: 'view',
          name: 'roleList',
          route: '/setting/role/list',
          filePath: 'views/setting/role/list.vue',
          inNav: false,
          permission: ['system-role-list', 'admin']
        }
      ]
    },
    {
      title: '部门汇报关系',
      type: 'tab',
      name: null,
      route: '/setting/report/list',
      filePath: 'views/setting/report/',
      inNav: true,
      permission: ['system-report', 'admin'],
      children: [
        {
          title: '汇报列表',
          type: 'view',
          name: 'ReportList',
          route: '/setting/report/list',
          filePath: 'views/setting/report/list.vue',
          inNav: false,
          permission: ['system-report-list', 'admin']
        }
      ]
    },
    {
      title: '合同类型管理',
      type: 'tab',
      name: null,
      route: '/setting/contract/list',
      filePath: 'views/setting/contract/',
      inNav: true,
      permission: ['system-contract', 'admin'],
      children: [
        {
          title: '合同类型列表',
          type: 'view',
          name: 'contractList',
          route: '/setting/contract/list',
          filePath: 'views/setting/contract/list.vue',
          inNav: false,
          permission: ['system-contract-list', 'admin']
        },
        {
          title: '合同子类型列表',
          type: 'view',
          name: 'contractChildList',
          route: '/setting/contract/childlist',
          filePath: 'views/setting/contract/child-list.vue',
          inNav: false,
          permission: ['system-contract-childlist', 'admin']
        },
        {
          title: '合同类型设置',
          type: 'view',
          name: 'contractSet',
          route: '/setting/contract/set',
          filePath: 'views/setting/contract/set.vue',
          inNav: false,
          permission: ['system-contract-set', 'admin']
        }
      ]
    },
    {
      title: '请款类型管理',
      type: 'tab',
      name: null,
      route: '/setting/loan/list',
      filePath: 'views/setting/loan/',
      inNav: false,
      permission: ['system-loan', 'admin'],
      children: [
        {
          title: '请款类型列表',
          type: 'view',
          name: 'loanList',
          route: '/setting/loan/list',
          filePath: 'views/setting/loan/list.vue',
          inNav: false,
          permission: ['system-loan-list', 'admin']
        },
        {
          title: '请款子类型列表',
          type: 'view',
          name: 'loanChildList',
          route: '/setting/loan/childlist',
          filePath: 'views/setting/loan/child-list.vue',
          inNav: false,
          permission: ['system-loan-childlist', 'admin']
        },
        {
          title: '请款类型设置',
          type: 'view',
          name: 'loanSet',
          route: '/setting/loan/set',
          filePath: 'views/setting/loan/set.vue',
          inNav: false,
          permission: ['system-loan-set', 'admin']
        }
      ]
    },
    {
      title: '报销类型管理',
      type: 'tab',
      name: null,
      route: '/setting/expense/list',
      filePath: 'views/setting/expense/',
      inNav: false,
      permission: ['system-expense', 'admin'],
      children: [
        {
          title: '报销类型列表',
          type: 'view',
          name: 'expenseList',
          route: '/setting/expense/list',
          filePath: 'views/setting/expense/list.vue',
          inNav: false,
          permission: ['system-expense-list', 'admin']
        },
        {
          title: '报销子类型列表',
          type: 'view',
          name: 'expenseChildList',
          route: '/setting/expense/childlist',
          filePath: 'views/setting/expense/child-list.vue',
          inNav: false,
          permission: ['system-expense-childlist', 'admin']
        },
        {
          title: '报销类型设置',
          type: 'view',
          name: 'expenseSet',
          route: '/setting/expense/set',
          filePath: 'views/setting/expense/set.vue',
          inNav: false,
          permission: ['system-expense-set', 'admin']
        }
      ]
    },
    {
      title: '日志管理',
      type: 'tab',
      name: null,
      route: '/setting/log/list',
      filePath: 'views/setting/log/',
      inNav: true,
      permission: ['system-log', 'admin'],
      children: [
        {
          title: '日志列表',
          type: 'view',
          name: 'logList',
          route: '/setting/log/list',
          filePath: 'views/setting/log/list.vue',
          inNav: false,
          permission: ['system-log-list', 'admin']
        }
      ]
    }
  ]
}
export default systemRouter
