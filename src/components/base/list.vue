<template>
  <div class="base-list">
    <u-table
      :data="tableData"
      border
      :max-height="773"
      :row-height="36"
      v-loading="loading"
      :element-loading-text="elementLoadingText"
      use-virtual
      :row-style="$Util.Style.tableRowStyle()"
      :cell-style="$Util.Style.tableCellStyle()"
      :header-row-style="$Util.Style.tableHeaderRowStyle()"
      :header-cell-style="$Util.Style.tableHeaderCellStyle()"
      @selection-change="chooseSelect"
      @sort-change="changeSort"
    >
      <!-- 多选框 -->
      <u-table-column type="selection" width="36px" fixed="left" v-if="showMultiSelect"></u-table-column>
      <!-- 开始循环 -->
      <template v-for="item in tableColumn">
        <!-- 正常表单列 -->
        <u-table-column
          v-if="item.canLink != true"
          v-bind:key="item.label"
          :sortable="item.sort"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="true"
          :width="item.width ? item.width : ''"
          :min-width="item.minWidth ? item.minWidth : ''"
          header-align="center"
          :align="item.align"
        ></u-table-column>
        <u-table-column v-if="item.canLink == true" v-bind:key="item.label" :sortable="item.sort" :prop="item.prop" :label="item.label" :show-overflow-tooltip="true" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" header-align="center" :align="item.align">
          <template slot-scope="scope">
            <slot name="test" v-bind:data="scope.row"></slot>
            <router-link v-if="linkFields[item.prop].customeize != true" v-bind:to="linkFields[item.prop].link + '?' + linkFields[item.prop].field + '=' + scope.row[linkFields[item.prop].field]">{{ scope.row[item.prop] }}</router-link>
            <a v-if="linkFields[item.prop].customeize == true && scope.row[item.prop]" :href="scope.row[linkFields[item.prop].field]">{{ scope.row[item.prop] }}</a>
          </template>
        </u-table-column>
      </template>
      <!-- 操作列 -->
      <u-table-column label="操作" align="center" fixed="right" :width="operateColumnWidth" v-if="!hideOperation && showOperate">
        <template slot-scope="scope">
          <el-button v-for="(item, index) in tableOperation" :class="(scope.row.class && scope.row.class[item.event]) || scope.row.class.default" size="mini" :key="index" @click.native="callMethod(item.event, scope.$index, scope.row, item.type)">{{ item.label }} </el-button>
        </template>
      </u-table-column>
    </u-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination @current-change="pageChange" @size-change="pageSizeChange" :background="true" :page-size="limit" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total_nums"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      showMultiSelect: false,
      elementLoadingText: '正在加载中...',
      tableColumn: [],
      tableOperation: [],
      linkFields: {},
      pageConf: {},
      limit: 10,
      currentPage: 1,
      total_nums: 0,
      operateColumnWidth: 100,
      hideOperation: false,
      showOperate: true
    }
  },
  computed: {
    ...mapGetters(['commonConf', 'user', 'permissions', 'pageName'])
  },
  inject: ['eventBus', 'reload'],
  created() {
    this.$Util.Common.registerBusEvent(this, 'listDataEvent', 'processEvent')

    const { tableColumn, linkFields, tableOperation, showMultiSelect, hideOperation, operatePermissionName } = this.$DataConf[this.pageName]

    this.tableColumn = tableColumn // 表头字段
    this.linkFields = linkFields // 列表可编辑字段
    this.tableOperation = tableOperation // 列表操作
    this.showMultiSelect = showMultiSelect
    this.hideOperation = hideOperation
    // 校验操作列展示权限 有操作权限的列表，没有权限，不展示操作列（超管除外） 操作列展示通过数据权限和按钮权限来控制显示隐藏 todo
    if (operatePermissionName && !this.permissions.includes(operatePermissionName) && this.user.is_admin != 1) {
      this.showOperate = false
    }
    this.operatePermissionName = operatePermissionName

    // 计算操作列宽度 todo
    const operateColumnWidth = this.tableOperation.length * 50
    this.operateColumnWidth = `${operateColumnWidth}px`
    this.setBtnSort() // 列表按钮排序
    this.pageConf = _.cloneDeep(this.commonConf)
  },
  methods: {
    processEvent(data) {
      this.tableData = data.list || []
      this.total_nums = data.total || 0
    },
    // 根据不同参数调用不同方法
    callMethod(func, index, val, type) {
      if (!func) return false

      const self = this
      try {
        this.$options.methods[func](self, index, val, type)
      } catch (e) {
        this.$parent[func](self, index, val, type)
      }
    },

    // 列表字段排序
    changeSort() {},

    // 切换分页
    pageChange(val) {
      this.currentPage = val
      const offset = (this.currentPage - 1) * this.limit
      const params = { currentPage: this.currentPage, searchParams: { offset } }
      this.$Util.Common.emitToEvent(this, 'searchEvent', params)
    },

    // 修改每页展示条数
    pageSizeChange(val) {
      this.limit = val
      const offset = (this.currentPage - 1) * this.limit

      const params = { searchParams: { offset, limit: this.limit } }
      this.$Util.Common.emitToEvent(this, 'searchEvent', params)
    },

    // 空方法，防止报错
    emptyMethod() {},

    // 单条编辑
    edit(self, index, val, type = '') {
      if (type == 'dialog') {
        const data = { func: 'showEditDialog', title: '编辑记录', params: { id: val.id } }
        self.$Util.Common.emitToEvent(this, 'dialogEvent', data)
      } else {
        const url = self.$DataConf[self.pageName].urls.editPage
        const params = { id: val.id }
        self.$router.push({ path: url, query: params })
      }
    },

    // 启用
    start(self, index, val) {
      const data = { func: 'showConfirmDialog', message: '确认启用？', type: 'start', params: { ids: [val.id] } }
      this.$Util.Common.emitToEvent(this, 'dialogEvent', data)
    },

    // 停用
    stop(self, index, val) {
      const data = { func: 'showConfirmDialog', message: '确认停用？', type: 'stop', params: { ids: [val.id] } }
      this.$Util.Common.emitToEvent(this, 'dialogEvent', data)
    },

    // 删除
    delete(self, index, val) {
      const data = { func: 'showConfirmDialog', message: '确认删除？', type: 'delete', params: { id: val.id } }
      this.$Util.Common.emitToEvent(this, 'dialogEvent', data)
    },

    // 查看详情
    view(self, index, val) {
      const url = self.$DataConf[self.pageName].urls.viewPage
      self.$router.push({ path: url, query: { id: val.id } })
    },

    // 打印
    print(self, index, val) {
      const url = self.$DataConf[self.pageName].urls.viewPage
      self.$router.push({ path: url, query: { id: val.id } })
    },

    // 下载
    download(self, index, val) {
      window.open(`${self.$DataConf[self.pageName].urls.download}?id=${val.id}`)
    },

    // 获取下拉列表
    async showOptionList(self, listKey) {
      if (self.pageConf[listKey]) {
        return true
      }
      const url = self.$DataConf[self.pageName].urls[listKey]
      const listData = await self.$axios({ method: 'get', url, data: {} })
      self.$set(self.pageConf, listKey, listData.data.list)
    },

    // 列表记录勾选
    chooseSelect(data) {
      this.$Util.Common.emitToEvent(this, 'batchEvent', data)
    },

    // 列表按钮排序
    setBtnSort() {
      //   const menuSortMap = this.$store.state.user.menu_list
      //   this.tableOperation.map(item => {
      //     item.sort = menuSortMap[item.permission]
      //     return true
      //   })
      //   this.tableOperation.sort(this.$Util.Util.Compare('sort'))
    }
  }
}
</script>
<style lang="scss" scoped>
.base-list {
  padding: 0 30px;
  margin-top: 0px;

  .operations {
    flex-grow: 1;
    border: 0px !important;
    text-align: center;
    color: $theme;
  }

  .operations-disabled {
    display: none;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
  .operations .el-button {
    width: 40px;
    border: 0px;
    color: #3798fc;
    padding: 5px 7px;

    &:hover {
      background: #f4f6f9 !important;
      color: #3798fc;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
  /deep/ .el-button.el-button--mini {
    padding: 5px 6px;
  }
  /deep/ .el-button:hover {
    background: $active-font-color;
    color: $active-font-background;
  }
  /deep/ .el-table .cell.el-tooltip {
    display: inline-block;
  }
  /deep/ .el-pagination__sizes .el-input__suffix {
    top: 0px;
  }
  /deep/ .plTableBox .el-table th {
    padding: 1px 0;
  }
  /deep/ a {
    color: $theme;
    text-align: center;
    width: 100%;
  }
}
</style>
