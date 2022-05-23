import API from '@/data/api.js'

const showMultiSelect = false
// 表格列
const tableColumn = [
  { prop: 'c_username', label: '姓名', minWidth: '100px', align: 'center', sort: true, mock: '张三' },
  { prop: 'role_name', label: '角色', minWidth: '100px', align: 'center', sort: true, mock: '预算' },
  { prop: 'unique_id', label: '工号', minWidth: '100px', align: 'center', sort: true, mock: 'C202121' },
  { prop: 'email', label: '邮箱', minWidth: '160px', align: 'center', sort: true, mock: 'jetwong.wang@happyelements.com' },
  { prop: 'department_name', label: '所属部门', minWidth: '150px', align: 'center', sort: true, mock: '广告投放组' },
  { prop: 'code_name', label: '成本中心', minWidth: '150px', align: 'center', sort: true, mock: '游戏广告中心' },
  { prop: 'status_title', label: '在职状态', minWidth: '110px', align: 'center', sort: true, mock: '在职' }
]

// 列表可链接字段
const linkFields = {}

// 搜索项
const searchFields = [
  { type: 'text', label: '姓名', vModel: 'c_username' },
  { type: 'text', label: '工号', vModel: 'unique_id' },
  { type: 'text', label: '邮箱', vModel: 'email' },
  { type: 'select', label: '在职状态', visibleFunc: 'showOptionList', vModel: 'status_title', listKey: 'user_status' }
]

// 隐藏搜索项目
const hideSearchFields = [{ type: 'select', label: '角色', filterable: true, visibleFunc: 'showOptionList', vModel: 'user_role', listKey: 'roleList' }]

// 搜索参数
const searchParams = ['c_username', 'unique_id', 'status_title', 'email', 'user_role']

// 搜索参数转换
const convertSearchParams = {
  c_username: { prefix: 'uc_user', op: 'LIKE' },
  unique_id: { prefix: 'uc_user', op: 'LIKE' },
  email: { prefix: 'uc_user', op: 'LIKE' },
  status_title: { prefix: 'uc_user', op: '' },
  user_role: { prefix: '', op: '' }
}

// 列表上部按钮项
const pageOperation = []

// 列表上部更多操作项
const pageMoreOperation = []

// 列表右侧操作项
const tableOperation = [{ label: '编辑', event: 'edit', moreParams: true }]

// 请求url地址
const urls = {
  listDep: API.sysOrgApi.listDep,
  list: API.sysOrgApi.list,
  edit: API.sysOrgApi.edit,
  save: API.sysOrgApi.save,
  roleList: API.commonApi.roleList,
  editPage: '/system/organization/edit'
}

// 弹框列表字段
const dialogColumn = []

// 弹框列表查询字段
const dialogSearchFields = []

const dialogSearchParams = []

// 接口查询列表操作按钮
const dialogButton = []

const pageConf = {
  showMultiSelect,
  tableColumn,
  convertSearchParams,
  dialogColumn,
  dialogSearchFields,
  dialogSearchParams,
  dialogButton,
  linkFields,
  searchFields,
  hideSearchFields,
  searchParams,
  pageOperation,
  pageMoreOperation,
  tableOperation,
  urls
}

export default pageConf
