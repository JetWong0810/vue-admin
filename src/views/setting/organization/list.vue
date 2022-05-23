<template>
  <div class="organizationBox">
    <DepartmentTree ref="departmentTree" class="departmentTreeBox"></DepartmentTree>
    <!-- 列表页面 -->
    <div class="list-page" :class="pageName">
      <!-- 搜索 -->
      <common-search ref="common_search"></common-search>
      <!-- 列表上部操作 -->
      <top-operation ref="top_operation"></top-operation>
      <!-- 表格主体部分 -->
      <list-table ref="list_table">
        <!--<template v-slot:test="slotProps">
        <span style="color: #8686ed;margin-right: 10px;cursor: pointer" @click="preview(slotProps.data)">预览</span>
      </template>-->
      </list-table>
      <!-- 弹框部分 -->
      <dialogs ref="dialogs"></dialogs>
    </div>
  </div>
</template>

<script>
import DepartmentTree from '@/components/base/department-tree'
import listMixin from '@/core/mixin/list.js'
export default {
  mixins: [listMixin],
  components: {
    DepartmentTree
  },
  data() {
    return {}
  },
  mounted() {
    this.$Util.Common.registerBusEvent(this, 'listEvent' + this.pageName, 'processEvent')
    this.$Util.Common.registerBusEvent(this, 'permitBtnEvent' + this.pageName, 'processBtnEvent')

    const params = { currentPage: 1, searchParams: { offset: 0 } }
    this.$Util.Common.emitToEvent(this, 'searchEvent', params)
  },
  methods: {
    processBtnEvent(data) {
      console.log(data)
    },
    edit(data) {
      const url = this.$DataConf[this.pageName].urls.editPage
      const params = { unique_id: data.unique_id }
      this.$router.push({ path: url, query: params })
    }
  }
}
</script>
<style lang="scss" scoped>
.organizationBox {
  display: flex;
  align-items: flex-start;
  width: 100%;

  .departmentTreeBox {
    width: 22%;
    margin-right: 10px;
  }
  .list-page {
    width: 78%;
  }
}
</style>
