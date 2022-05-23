import API from '@/data/api.js'

const showMultiSelect = true
// 表格列
const tableColumn = [
  { prop: 'id', label: '序号', minWidth: '80px', align: 'center', sort: true, mock: '' },
  { prop: 'dept_id', label: '部门ID', minWidth: '100px', align: 'center', sort: true, mock: '255' },
  { prop: 'department_name', label: '部门名称', minWidth: '120px', align: 'center', sort: true, mock: '平面设计组' },
  { prop: 'code', label: 'code名称', minWidth: '150px', align: 'center', sort: true, mock: 'OMG-061' },
  { prop: 'level_1_name', label: 'level_1', minWidth: '100px', align: 'center', sort: true, mock: '王峥' },
  { prop: 'level_2_name', label: 'level_2', minWidth: '100px', align: 'center', sort: true, mock: '朱晓川' },
  { prop: 'level_3_name', label: 'level_3', minWidth: '100px', align: 'center', sort: true, mock: '吴新辉' },
  { prop: 'level_4_name', label: 'level_4', minWidth: '100px', align: 'center', sort: true, mock: '郑利琼' },
  { prop: 'level_5_name', label: 'level_5', minWidth: '100px', align: 'center', sort: true, mock: '王海宁' },
  { prop: 'status', label: '状态', minWidth: '80px', align: 'center', sort: true, mock: '启用' },
  { prop: 'is_default_name', label: '是否默认', minWidth: '110px', align: 'center', sort: true, mock: '是' },
  { prop: 'created_at', label: '创建时间', minWidth: '150px', align: 'center', sort: true, mock: '2021.11.11 00:00:00' }
]

// 列表可链接字段
const linkFields = {}

// 搜索项
const searchFields = [
  { type: 'text', label: '部门名称', vModel: 'name' },
  { type: 'text', label: 'code名称', vModel: 'code_name' },
  { type: 'select', label: '状态', visibleFunc: 'showOptionList', vModel: 'status', listKey: 'status_list' }
]

// 隐藏搜索项目
const hideSearchFields = []

// 搜索参数
const searchParams = ['name', 'code_name', 'status']

// 搜索参数转换
const convertSearchParams = {
  name: { prefix: 'uc_department', op: 'LIKE' },
  code_name: { prefix: 'uc_code', op: 'LIKE' },
  status: { prefix: 'dept_report_relation', op: '' }
}

// 列表上部按钮项
const pageOperation = [
  { label: '新增', event: 'showEditDialog', permission: ['admin', 'system-report-add'], style: 'width: 80px;', type: 'dialog' },
  { label: '上传', event: 'showUploadDialog', permission: ['admin', 'system-report-upload'], style: 'width: 80px;', type: 'dialog' },
  { label: '批量停用', event: 'stop', permission: ['admin', 'system-report-stop'], style: 'width: 100px;' },
  { label: '批量启用', event: 'start', permission: ['admin', 'system-report-start'], style: 'width: 100px;' },
  { label: '导出', event: 'export', permission: ['admin', 'system-report-export'], style: 'width: 80px;' }
]

// 列表上部更多操作项
const pageMoreOperation = []

// 列表右侧操作项
const tableOperation = [
  { label: '编辑', event: 'showDialog', class: 'operations', type: 'dialog' },
  { label: '停用', event: 'stop', class: 'operations', isShow: '启用' },
  { label: '启用', event: 'start', class: 'operations', isShow: '停用' },
  { label: '删除', event: 'delete', class: 'operations' }
]

// 请求url地址
const urls = {
  list: API.reportApi.list,
  edit: API.reportApi.edit,
  save: API.reportApi.save,
  update: API.reportApi.update,
  change: API.reportApi.change,
  export: API.reportApi.export,
  delete: API.reportApi.delete,
  upload: API.reportApi.upload,
  downloadTemplate: API.reportApi.downloadTemplate,
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
