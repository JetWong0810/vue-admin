const exampleRouter = {
  title: '测试菜单', // 页面/菜单名称
  type: 'folder', // folder 有子菜单 tab 子菜单  view 页面
  icon: '/example', // icon图标名
  filePath: 'views/example/', // 文件路径
  order: 1, // 菜单排序
  inNav: true, // 是否在菜单栏显示
  permission: '', // 权限  字符串/数组
  children: [
    {
      title: '子菜单',
      type: 'tab',
      route: '/example/list',
      filePath: 'views/example/',
      inNav: true,
      permission: '',
      children: [
        {
          title: '列表',
          type: 'view',
          name: 'ExampleList',
          route: '/example/list',
          filePath: 'views/example/list.vue',
          inNav: false,
          permission: ''
        },
        {
          title: '创建',
          type: 'view',
          name: 'ExampleAdd',
          inNav: false,
          route: '/example/add',
          filePath: 'views/example/add.vue',
          permission: ''
        }
      ]
    }
  ]
}
export default exampleRouter
