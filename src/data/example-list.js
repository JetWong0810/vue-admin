// import API from '@/data/api.js'

const showMultiSelect = true

const operatePermissionName = ''

// 表格列
const tableColumn = [
  { prop: 'apply_num', label: '申请单号', minWidth: '140px', align: 'center', sort: true, canLink: true, mockVal: "@string('number', 10)" },
  { prop: 'created_cname', label: '申请人', minWidth: '100px', align: 'center', sort: true, mockVal: '@cname' },
  { prop: 'created_user_dept_name', label: '部门', minWidth: '140px', align: 'center', sort: true, mockVal: '@ctitle(5)' },
  { prop: 'company_name', label: '公司名称', minWidth: '180px', align: 'center', sort: true, mockList: 'companyList' },
  { prop: 'apply_type_name', label: '申请类型', minWidth: '120px', align: 'center', sort: true, mockVal: '@ctitle(2)' },
  { prop: 'stamp_type_name', label: '用印类型', minWidth: '140px', align: 'center', sort: true, mockVal: '@ctitle(3)' },
  { prop: 'purpose', label: '用途', minWidth: '120px', align: 'center', sort: true, mockVal: '@ctitle(10)' },
  { prop: 'payment_to', label: '给付对象', minWidth: '140px', align: 'center', sort: true, mockVal: '@ctitle(4)' },
  { prop: 'file_type', label: '文件类型', minWidth: '140px', align: 'center', sort: true, mockVal: '@ctitle(2)' },
  { prop: 'file_explain', label: '文件说明', minWidth: '140px', align: 'center', sort: true, mockVal: '@ctitle(6)' },
  { prop: 'file', label: '附件', minWidth: '110px', align: 'center', sort: true, mockVal: '下载', canLink: true },
  { prop: 'created_at', label: '申请时间', minWidth: '150px', align: 'center', sort: true, mockVal: '@date' },
  { prop: 'check_cname', label: '审核人', minWidth: '120px', align: 'center', sort: true, mockVal: '@cname' },
  { prop: 'check_status', label: '审核状态', minWidth: '120px', align: 'center', sort: true, mockVal: '@ctitle(2)' },
  { prop: 'check_time', label: '审核时间', minWidth: '150px', align: 'center', sort: true, mockVal: '@date' },
  { prop: 'check_remark', label: '备注', minWidth: '120px', align: 'center', sort: true, mockVal: '@ctitle(4)' }
]

// 列表可链接字段
const linkFields = {
  file: { link: '', field: 'file_url', customeize: true },
  apply_num: { link: '/log/seal/detail', field: 'apply_num' }
}

// 搜索项
const searchFields = [
  { type: 'text', label: '申请单号', vModel: 'apply_num' },
  {
    type: 'select',
    label: '公司名称',
    filterable: true,
    visibleFunc: 'showOptionList',
    vModel: 'company',
    listKey: 'company_list'
  },
  {
    type: 'select',
    label: '申请类型',
    visibleFunc: 'showOptionList',
    vModel: 'apply_type',
    listKey: 'stamp_apply_type_list'
  },
  { type: 'select', label: '用印类型', visibleFunc: 'showOptionList', vModel: 'stamp_type', listKey: 'stamp_type' }
]

// 隐藏搜索项目
const hideSearchFields = [
  {
    type: 'select',
    label: '文件类型',
    visibleFunc: 'showOptionList',
    vModel: 'file_type',
    listKey: 'stamp_file_type'
  },
  { type: 'date', label: '申请时间', vModel: 'created_at' },
  { type: 'text', label: '申请人', vModel: 'apply_username' },
  {
    type: 'select',
    label: '审核状态',
    visibleFunc: 'showOptionList',
    vModel: 'check_status',
    listKey: 'audit_status'
  },
  { type: 'date', label: '审核时间', vModel: 'check_time' }
]

// 搜索参数
const searchParams = ['apply_num', 'company', 'apply_type', 'stamp_type', 'file_type', 'created_at', 'apply_username', 'check_status', 'check_time']

// 搜索参数转换
const convertSearchParams = {
  apply_num: { prefix: '', op: 'LIKE' },
  company: { prefix: '', op: '' },
  apply_type: { prefix: '', op: '' },
  stamp_type: { prefix: '', op: '' },
  file_type: { prefix: '', op: '' },
  apply_username: { prefix: '', op: 'LIKE' },
  created_at: { prefix: '', op: 'RANGE' },
  check_status: { prefix: '', op: '' },
  check_time: { prefix: '', op: 'RANGE' }
}

// 列表上部按钮项
const pageOperation = [
  { label: '批量通过', event: 'agree', permission: 'audit-sael-list-agree', style: 'width: 100px;' },
  { label: '批量驳回', event: 'refuse', permission: 'audit-sael-list-refuse', style: 'width: 100px;' },
  { label: '导出', event: 'export', permission: 'audit-sael-list-export', style: 'width: 80px;' }
]

// 列表右侧操作项
const tableOperation = [
  { label: '通过', event: 'agree', permission: 'audit-seal-list-operate', class: 'operations' },
  { label: '驳回', event: 'refuse', permission: 'audit-seal-list-operate', class: 'operations' }
]

// 请求url地址
const urls = {
  list: '/'
}

const pageConf = {
  operatePermissionName,
  showMultiSelect,
  tableColumn,
  convertSearchParams,
  linkFields,
  searchFields,
  hideSearchFields,
  searchParams,
  pageOperation,
  tableOperation,
  urls
}

export default pageConf
