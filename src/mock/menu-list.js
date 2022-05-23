const menuList = [
  {
    id: 1,
    name: 'SystemManage',
    icon: 'system',
    title: '系统设置',
    children: [
      {
        id: 2,
        name: 'OrgManage',
        title: '组织管理',
        route: '/setting/organization/list'
      },
      {
        id: 3,
        name: 'RoleManage',
        title: '角色管理'
      },
      {
        id: 4,
        name: 'reportManage',
        title: '部门汇报关系',
        route: '/setting/report/list'
      },
      {
        id: 5,
        name: 'CompanyList',
        title: '公司列表'
      },
      {
        id: 6,
        name: 'VenderList',
        title: '供应商列表'
      },
      {
        id: 7,
        name: 'RateList',
        title: '汇率列表'
      },
      {
        id: 8,
        name: 'LogManage',
        title: '日志管理'
      },
      {
        id: 9,
        name: 'MenuManage',
        title: '菜单管理'
      }
    ]
  },
  {
    id: 10,
    name: 'FlowManage',
    icon: 'flow',
    title: '流程管理',
    children: [
      {
        id: 11,
        name: 'ContractFlow',
        title: '合同流程管理'
      }
    ]
  }
]

export default menuList
