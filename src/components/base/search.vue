<template>
  <div class="base-search">
    <!-- 列表查询表单 -->
    <el-form :inline="true">
      <div class="search-box" v-bind:class="{ 'search-box-justify-between': searchFields.length == 4 }">
        <template v-for="(item, index) in searchFields">
          <el-form-item :label="item.label" v-if="item.type == 'select'" :key="index">
            <el-select v-model="searchParams.filter[item.vModel]" :filterable="item.filterable" :allow-create="item.allowCreate" @visible-change="callMethod(item.visibleFunc, item.listKey)" clearable placeholder="请选择">
              <el-option v-for="(item, index) in pageConf[item.listKey]" :key="index" :label="item" :value="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'date'" :key="index">
            <div class="block">
              <el-date-picker v-model="searchParams.filter[item.vModel]" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'text'" :key="index">
            <el-input v-model="searchParams.filter[item.vModel]" clearable></el-input>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'radio'" :key="index">
            <el-checkbox v-model="searchParams.filter[item.vModel]"></el-checkbox>
          </el-form-item>
        </template>
      </div>
      <div class="search-box search-box-justify-start" v-if="showAllConditions">
        <template v-for="(item, index) in hideSearchFields">
          <el-form-item :label="item.label" v-if="item.type == 'select'" :key="index">
            <el-select v-model="searchParams.filter[item.vModel]" :filterable="item.filterable" @visible-change="callMethod(item.visibleFunc, item.listKey)" clearable placeholder="请选择">
              <el-option v-for="(item, index) in pageConf[item.listKey]" :key="index" :label="item" :value="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'date'" :key="index">
            <div class="block">
              <el-date-picker v-model="searchParams.filter[item.vModel]" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'text'" :key="index">
            <el-input v-model="searchParams.filter[item.vModel]" clearable></el-input>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'radio'" :key="index">
            <el-checkbox v-model="searchParams.filter[item.vModel]"></el-checkbox>
          </el-form-item>
        </template>
      </div>
      <div class="btn-box" v-if="searchFields.length > 0">
        <el-form-item>
          <el-button type="primary" @click="onSearchSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="onSearchReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="show-more" @click="showAllSearchConditions">{{ searchBtnTitle }}<i v-bind:class="{ 'el-icon-arrow-down': !showAllConditions, 'el-icon-arrow-up': showAllConditions }" class="el-icon--right"></i></el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchBtnTitle: '展开查询',
      currentPage: 1, // 默认获取第一页的数据
      // 查询条件
      searchParams: {
        filter: {},
        op: {},
        order: 'DESC',
        sort: 'updated_at',
        offset: 0,
        limit: 10
      },
      searchFields: [], // 搜索字段配置
      convertSearchParams: {}, // 搜索参数转换规则
      pageConf: {}, // 当前页通用配置
      hideSearchFields: [], // 隐藏搜索字段配置
      showAllConditions: false
    }
  },
  computed: {
    ...mapGetters(['commonConf', 'pageName'])
  },
  inject: ['eventBus'],
  created() {
    this.$Util.Common.registerBusEvent(this, 'searchEvent', 'processEvent')

    const { searchParams, searchFields, convertSearchParams, hideSearchFields } = this.$DataConf[this.pageName] // 查询字段
    searchParams.forEach(item => {
      this.$set(this.searchParams.filter, item, '')
    })
    this.searchFields = searchFields
    this.convertSearchParams = convertSearchParams
    this.hideSearchFields = hideSearchFields
    this.pageConf = _.cloneDeep(this.commonConf)
  },
  methods: {
    processEvent(data) {
      console.log('接收到搜索参数')
      if (data.export) {
        // 导出
        this.export(data.ids)
        return
      }

      this.currentPage = data.currentPage || 1
      this.searchParams = this.$Util.Util.deepObjMerge(this.searchParams, data.searchParams)
      this.getTableData()
    },

    // 查询获取列表数据
    async getTableData() {
      const newParams = this.formatParams()
      const url = this.$DataConf[this.pageName].urls.list
      const res = await this.$axios({ method: 'get', url, data: newParams })
      console.log(res, 123)
      this.$Util.Common.emitToEvent(this, 'listEvent' + this.pageName, { list: res.data.list, total: res.data.total })
    },

    // 组装查询参数
    formatParams() {
      const newParams = _.cloneDeep(this.searchParams)
      newParams.filter = {}
      newParams.op = {}
      for (const i in this.searchParams.filter) {
        if (i == 'except') continue
        const item = this.searchParams.filter[i]
        const prefix = this.convertSearchParams[i].prefix ? `${this.convertSearchParams[i].prefix}.` : ''
        if (!item && item !== 0) {
          newParams.filter[prefix + i] = '-1'
        } else if (this.convertSearchParams[i].op == 'RANGE') {
          newParams.filter[prefix + i] = `${item[0]}+00:00:00+-+${item[1]}+23:59:59`
          newParams.op[prefix + i] = 'RANGE'
        } else if (this.convertSearchParams[i].op == 'LIKE') {
          if (i == 'code_name') {
            newParams.filter[`${prefix}name`] = item
            newParams.op[`${prefix}name`] = 'LIKE'
          } else {
            newParams.filter[prefix + i] = item
            newParams.op[prefix + i] = 'LIKE'
          }
        } else if (this.convertSearchParams[i].realVal) {
          newParams.filter[prefix + i] = this.convertSearchParams[i].realVal
        } else {
          newParams.filter[prefix + i] = item
        }
      }
      console.log('当前列表页查询转换后参数:', newParams)

      return newParams
    },

    // 列表搜索查询
    onSearchSubmit() {
      this.searchParams.offset = 0 // 搜索前重置分页参数
      this.getTableData()
    },

    // 列表搜索重置
    onSearchReset() {
      for (const i in this.searchParams.filter) {
        if (i == 'except') continue
        this.$set(this.searchParams.filter, i, '')
      }
    },
    // 展示所有查询选项
    showAllSearchConditions() {
      this.showAllConditions = !this.showAllConditions
      this.searchBtnTitle = this.showAllConditions == true ? '收起查询' : '展开查询'
    },

    // 根据不同参数调用不同方法
    callMethod(func, listKey) {
      const self = this
      this.$options.methods[func](self, listKey)
    },

    // 获取下拉列表
    async showOptionList(self, listKey) {
      if (self.pageConf[listKey]) {
        return true
      }
      const url = this.$DataConf[self.pageName].urls[listKey]
      const listData = await self.$axios({ method: 'get', url, data: {} })
      self.$set(self.pageConf, listKey, listData.data.list)
    },

    // 批量导出
    async export(ids) {
      let newParams = {}
      if (ids && ids.length > 0) {
        newParams.ids = JSON.stringify(ids)
      } else {
        newParams = this.formatParams()
        newParams.limit = 100000 // 下载全部筛选记录
      }
      const res = await this.$axios({ method: 'get', url: this.$DataConf[this.pageName].urls.export, data: newParams })
      window.location.href = res.data.url
    }
  }
}
</script>
<style lang="scss" scoped>
.base-search {
  padding: 0 30px;
  margin: 30px auto 0px;

  .search-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }

  .search-box-justify-between {
    justify-content: space-between;
  }

  .search-box-justify-start {
    justify-content: flex-start;

    .el-form-item {
      margin-right: 50px;
    }
  }

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;

    .show-more {
      border: 0px;
      background: white;
      width: 90px;
    }

    /deep/ .el-form-item {
      padding: 0px 5px;
      margin-right: 0px !important;
    }
  }

  /deep/ .el-form-item__content .el-input {
    width: 150px;
  }
  /deep/ .el-input .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  /deep/ .el-form-item .el-form-item__label {
    height: 40px;
  }
  /deep/ .el-form-item {
    height: 56px;
  }
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 270px;
  }
  /deep/ .el-range-separator {
    line-height: 32px;
  }
}
</style>
