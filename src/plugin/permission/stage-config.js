const permissionRouter = {
  route: null,
  name: null,
  title: '权限管理',
  type: 'folder',
  icon: '/example',
  filePath: 'views/permission/',
  order: 11,
  inNav: true,
  children: [
    {
      title: '舞台页面',
      type: 'view',
      name: 'permissionStage1',
      route: '/permission/stage1',
      filePath: 'plugin/permission/view/stage1.vue',
      inNav: true,
      right: null
    },
    {
      title: '舞台页面',
      type: 'view',
      name: 'permissionStage2',
      route: '/permission/stage2',
      filePath: 'plugin/permission/view/stage2.vue',
      inNav: true,
      right: null
    }
  ]
}

export default permissionRouter
