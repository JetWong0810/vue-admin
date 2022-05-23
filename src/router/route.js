import homeRouter from './home-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/setting/organization/list',
    component: () => import('@/views/index'),
    children: [...homeRouter]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    redirect: '/error',
    path: '*'
  }
]

export default routes
