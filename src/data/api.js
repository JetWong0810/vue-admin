/* eslint-disable */

// 组织管理接口
const sysOrgApi = {
  listDep: '/api/dept/list', // 架构列表
  list: '/api/dept/userList', // 指定部门员工列表
  edit: '/api/dept/userEdit', // 员工编辑
  save: '/api/dept/userUpdate' // 员工保存
}

// 角色管理接口
const roleApi = {
  list: '/api/appRole/list', // 列表
  update: '/api/appRole/update', // 编辑保存
  change: '/api/appRole/statusChange', // 变更状态
  export: '/api/appRole/export', // 导出
  save: '/api/appRole/create', // 新建保存
  edit: '/api/appRole/edit' // 编辑页面展示
}

// 部门汇报关系接口
const reportApi = {
  list: '/api/reportRelation/list', // 列表
  save: '/api/reportRelation/create', // 新建保存
  edit: '/api/reportRelation/edit', // 编辑
  update: '/api/reportRelation/update', // 编辑保存
  change: '/api/reportRelation/statusChange', // 变更状态
  export: '/api/reportRelation/export', // 导出
  delete: '/api/reportRelation/delete', // 删除
  upload: '/api/reportRelation/import', // 上传
  downloadTemplate: '/api/common/download/template/report_relation' // 下载模板
}

// 合同类型管理
const contractTypeApi = {
  list: '/api/contractType/list', // 列表
  save: '/api/contractType/create', // 新建保存
  edit: '/api/contractType/edit', // 编辑
  update: '/api/contractType/update', // 编辑保存
  change: '/api/contractType/statusChange', // 变更状态
  export: '/api/contractType/export', // 导出
  delete: '/api/contractType/delete' // 删除
}

// 合同子类型管理
const contractChildTypeApi = {
  list: '/api/contractTypeChild/list', // 列表
  save: '/api/contractTypeChild/create', // 新建保存
  edit: '/api/contractTypeChild/edit', // 编辑
  update: '/api/contractTypeChild/update', // 编辑保存
  change: '/api/contractTypeChild/statusChange', // 变更状态
  export: '/api/contractTypeChild/export' // 导出
}

// 日志管理
const logApi = {
  list: '/api/log/list' // 列表
}

// 流程管理
const flowApi = {
  list: '/api/flow/list', // 列表
  save: '/api/flow/create', // 新建保存
  edit: '/api/flow/edit', // 编辑
  update: '/api/flow/update', // 编辑保存
  change: '/api/flow/statusChange', // 变更状态
  preview: '/api/flow/previewFlow', // 导入数据预览
  flowEdit: '/api/flow/streamEdit', // 审批流编辑
  flowUpdate: '/api/flow/streamUpdate' // 审批流更新
}

// 通用接口
const commonApi = {
  login: '/api/login', // 执行登录
  logout: '/api/logout', // 退出登录
  userinfo: '/api/userinfo', // 获取用户信息
  ssoUrl: '/api/ssoUrl', // 获取sso登录地址
  ssoLogin: '/ssoLogin', // 执行sso登录
  getSetting: '/api/conditionSetting/setting', // 获取设置
  saveSetting: '/api/conditionSetting/settingSave', // 保存设置
  batchUpdate: '/api/conditionSetting/batchUpdate', // 批量替换
  depList: '/api/common/departmentList', // 部门下拉
  contractTypeList: '/api/common/contractTypeList', // 合同类型下拉
  roleUserList: '/api/common/roleUserList', // 角色用户下拉
  contractChildTypeList: '/api/common/contractTypeChildList', // 合同子类型下拉
  roleList: '/api/common/appRoleList', // 角色下拉
  userList: '/api/common/userList', // 员工下拉
  commonList: '/api/common/dropdownList', // 全局通用下拉
  orgList: '/api/dept/list', // 部门架构下拉
  setList: '/api/common/contractSetDropdownList' // 合同类型设置下拉配置
}

export default { sysOrgApi, roleApi, reportApi, contractTypeApi, contractChildTypeApi, logApi, flowApi, commonApi }
