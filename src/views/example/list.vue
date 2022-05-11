<template>
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
    <!-- 附件预览 -->
    <Preview ref="preview"></Preview>
  </div>
</template>

<script>
import listMixin from '@/core/mixin/list.js'
import Preview from '@/components/preview/index'
export default {
  mixins: [listMixin],
  components: {
    Preview
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
    processEvent(data) {
      data.list.map(item => {
        item.water = item.default_water ? item.default_water : item.customize_water
        if (item.check_status == '通过' && item.is_valid == '是') {
          // 通过已失效 查看/重新申请
          item.class = { view: 'operations', delete: 'operations-disabled', download: 'operations-disabled', revert: 'operations-disabled', reapply: 'operations', default: 'operations' }
        } else if (item.check_status == '通过' && item.is_valid == '否') {
          // 通过未失效 查看/下载
          item.class = { view: 'operations', delete: 'operations-disabled', download: 'operations', revert: 'operations-disabled', reapply: 'operations', default: 'operations' }
        } else if (item.check_status == '驳回') {
          // 驳回 查看/重新申请
          item.class = { view: 'operations', delete: 'operations-disabled', download: 'operations-disabled', revert: 'operations-disabled', reapply: 'operations', default: 'operations' }
        } else if (item.check_status == '已撤回') {
          // 撤回 查看/重新申请/删除
          item.class = { view: 'operations', delete: 'operations', download: 'operations-disabled', revert: 'operations-disabled', reapply: 'operations', default: 'operations' }
        } else if (item.check_status == '待审核') {
          // 待审核 查看/撤回
          item.class = { view: 'operations', delete: 'operations-disabled', download: 'operations-disabled', revert: 'operations', reapply: 'operations-disabled', default: 'operations' }
        } else {
          item.class = { default: 'operations-disabled' }
        }
        return true
      })

      this.$Util.Common.emitToEvent(this, 'listDataEvent', data)
    },
    processBtnEvent(data) {
      console.log(data)
    },
    preview(val) {
      this.$refs.preview.id = val.id
      this.$refs.preview.dialogFormVisible = true
    }
  }
}
</script>
