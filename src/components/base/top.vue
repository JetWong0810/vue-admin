<template>
  <!-- 列表上部按钮操作 -->
  <div class="base-operation">
    <div class="operation-left">
      <!--<el-badge :value="12" class="item">
        <el-button size="small active">待审核</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button size="small">已审核</el-button>
      </el-badge>
      <el-badge :value="1" class="item" type="primary">
        <el-button size="small">已验收</el-button>
      </el-badge>
      <el-badge :value="2" class="item" type="warning">
        <el-button size="small">已归档</el-button>
      </el-badge>-->
    </div>
    <div class="operation-right">
      <template v-for="(item, index) in pageOperation">
        <el-button type="primary" @click="callMethod(item.event, item.type)" :key="index">{{ item.label }}</el-button>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pageOperation: [],
      chooseData: [],
      activeBtn: 0,
      bageNumList: {}
    }
  },
  computed: {
    ...mapGetters(['pageName', 'user'])
  },
  inject: ['eventBus'],
  async created() {
    this.$Util.Common.registerBusEvent(this, 'batchEvent', 'processEvent')
    this.$Util.Common.registerBusEvent(this, 'btnCountEvent', 'processCountEvent')

    this.pageOperation = _.cloneDeep(this.$DataConf[this.pageName].pageOperation)
    // 左侧及右侧的按钮可见性控制 左侧tab一般和用户权限有关，右侧按钮和用户权限及左侧tab的切换相关
    this.$Util.Common.emitToEvent(this, 'permitBtnEvent' + this.pageName, this.pageOperation)
    this.setBtnSort() // 列表上部按钮排序
  },
  methods: {
    processEvent(data) {
      this.chooseData = data
    },
    processCountEvent(data) {
      console.log(data)
    },
    callMethod(func, type = '') {
      // 判断有无勾选数据, 新增无需勾选数据
      if (this.chooseData.length == 0 && ['stop', 'start', 'agree', 'refuse'].includes(func)) {
        this.$message.error('请先勾选数据')
        return false
      }
      const ids = []
      this.chooseData.forEach(item => {
        ids.push(item.id)
      })
      const self = this
      try {
        this.$options.methods[func](self, type, ids)
      } catch (e) {
        this.$parent[func]()
      }
    },
    // 添加数据
    add(self, type) {
      if (type == 'dialog') {
        const data = { func: 'showEditDialog', title: '新增记录', params: {} }
        self.$Util.Common.emitToEvent(self, 'dialogEvent', data)
      } else {
        const url = this.$DataConf[self.pageName].urls.addPage
        self.$router.push({ path: url, query: {} })
      }
    },
    // 批量启用
    start(self, type, ids) {
      const data = { func: 'showConfirmDialog', params: { ids, confirmMsg: '确认批量启用？', type: 'start' } }
      self.$Util.Common.emitToEvent(self, 'dialogEvent', data)
    },

    // 批量停用
    stop(self, type, ids) {
      const data = { func: 'showConfirmDialog', params: { ids, confirmMsg: '确认批量停用？', type: 'stop' } }
      self.$Util.Common.emitToEvent(self, 'dialogEvent', data)
    },
    // 批量通过
    agree(self, type, ids) {
      const data = { func: 'showConfirmDialog', params: { ids, confirmMsg: '确认批量通过？', type: 'agree' } }
      self.$Util.Common.emitToEvent(self, 'dialogEvent', data)
    },

    // 批量驳回
    refuse(self, type, ids) {
      const data = { func: 'showConfirmDialog', params: { ids, confirmMsg: '确认批量驳回？', type: 'agree' } }
      self.$Util.Common.emitToEvent(self, 'dialogEvent', data)
    },
    // 导出
    export(self, type, ids) {
      const params = { export: 1, ids }
      self.$Util.Common.emitToEvent(self, 'searchEvent', params)
    },
    // 列表上部按钮排序
    setBtnSort() {
      //   const menuSortMap = this.user.menu_list
      //   this.pageOperation.map(item => {
      //     item.sort = menuSortMap[item.permission]
      //     return true
      //   })
      //   this.pageOperation.sort(this.$Util.Util.Compare('sort'))
    }
  }
}
</script>
<style lang="scss" scoped>
.base-operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 8px 10px;
  .operation-left {
    /deep/ .el-button {
      border-radius: 0px;
      margin-right: -1px;
    }
    /deep/ .el-button.active {
      background: $theme;
      color: white;
    }
  }

  /deep/ .el-badge__content.is-fixed {
    z-index: 20000;
  }
}
</style>
