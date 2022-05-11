<template>
  <div class="dialogs">
    <!-- 批量和单个操作确认弹框 -->
    <el-dialog title="提示" :visible.sync="confirmDialog" width="22%" class="confirm-dialog">
      <p class="confirm-audit">{{ dialogParams.confirmMsg }}</p>
      <div class="refuse-reason" v-if="dialogParams.showReasonInput">
        <el-input v-model="remark" style="width: 250px" placeholder="请填写驳回理由"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button @click="confirmDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 通用的添加/编辑弹窗 -->
    <el-dialog :title="dialogParams.title" :visible.sync="editDialog" width="30%" class="edit-dialog">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="editDialog">
        <template v-for="(item, index) in dialogFields">
          <el-form-item :label="item.label" v-if="item.type == 'select'" :key="index">
            <el-select v-model="formData[item.vModel]" :filterable="item.filterable" :allow-create="item.allowCreate" @visible-change="callMethod(item.visibleFunc, item.listKey)" clearable placeholder="请选择">
              <el-option v-for="(item, index) in pageConf[item.listKey]" :key="index" :label="item" :value="index"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'date'" :prop="item.vModel" :key="index">
            <div class="block">
              <el-date-picker v-model="formData[item.vModel]" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'text'" :prop="item.vModel" :key="index">
            <el-input v-model="formData[item.vModel]" clearable></el-input>
          </el-form-item>
          <el-form-item :label="item.label" v-if="item.type == 'radio'" :prop="item.vModel" :key="index">
            <el-radio-group v-model="formData[item.vModel]">
              <el-radio label="启用">启用</el-radio>
              <el-radio label="停用">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('editDialog')">确 定</el-button>
        <el-button @click="closeDialog('editDialog')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      func: '', // 调用方法名
      dialogParams: {},
      editDialog: false,
      confirmDialog: false,
      confirmMsg: '',
      pageConf: {},
      formData: {},
      title: '',
      rules: {},
      remark: '',
      dialogFields: []
    }
  },
  computed: {
    ...mapGetters(['pageName'])
  },
  inject: ['eventBus', 'reload'],
  created() {
    this.$Util.Common.registerBusEvent(this, 'dialogEvent', 'processEvent')
  },
  methods: {
    processEvent(data) {
      this.dialogParams = data.params

      const self = this
      try {
        this.$options.methods[data.func](self)
      } catch (e) {
        this.$parent[data.func](self)
      }
    },
    showConfirmDialog(self) {
      self.confirmDialog = true
    },
    callMethod(func, listKey) {
      console.log(func, listKey)
    },
    async confirm() {
      const actionMap = { stop: 'close', start: 'open', agree: 'agree', refuse: 'refuse' }
      let url = ''
      let params = {}
      let httpMethod = 'post'
      if (this.dialogParams.type == 'start' || this.dialogParams.type == 'stop') {
        url = this.$DataConf[this.pageName].urls.change
        params = { ids: JSON.stringify(this.dialogParams.ids), action: actionMap[this.dialogParams.type] }
      } else if (this.dialogParams.type == 'delete') {
        url = this.$DataConf[this.pageName].urls.delete
        params = { id: this.dialogParams.id, apply_num: this.dialogParams.apply_num }
        httpMethod = 'get'
      } else if (this.dialogParams.type == 'agree' || this.dialogParams.type == 'refuse') {
        if (this.dialogParams.type == 'refuse' && !this.formData.check_remark) {
          this.$message.error('请填写驳回理由')
          return false
        }
        if (this.dialogParams.type == 'agree') {
          this.formData.check_remark = ''
        }
        url = this.$DataConf[this.pageName].urls.check
        params = { ids: JSON.stringify(this.dialogParams.ids), operate: this.dialogParams.type, check_remark: this.formData.check_remark }
        httpMethod = 'post'
      }

      console.log('弹窗确认参数:', url, params)
      const res = await this.$axios({ method: httpMethod, url, data: params })
      if (res.code == 0) {
        this.$message.success('操作成功')
        this.confirmDialog = false
        // 更新待审核数量
        // const totalRes = await this.$axios({ method: 'get', url: API.commonApi.bageNum, data: {} })
        // this.setLicenseTotal(totalRes.data.license_total)
        // this.setStampTotal(totalRes.data.stamp_total)
        if (window.location.href.indexOf('detail') != -1) {
          if (this.$route.query.from && this.$route.query.from == 'feishu') {
            // 关闭窗口
            setTimeout(() => {
              window.close()
            }, 1500)
          } else {
            this.$router.go(-1)
          }
        } else {
          this.eventBus.$emit('pageSizeChange', {})
        }
        // this.reload()
      } else {
        this.$message.error(res.message)
      }
    },
    async save(dialog_name) {
      this.$refs[dialog_name].validate(async valid => {
        if (valid) {
          const pageNameMap = { editDialog: 'OtherList' }
          const params = this.formData
          let url = ''
          if (params.id) {
            url = this.$DataConf[pageNameMap[dialog_name]].urls.update
          } else {
            url = this.$DataConf[pageNameMap[dialog_name]].urls.save
          }
          console.log('编辑或保存参数:', url, params)
          const res = await this.$axios({ method: 'post', url, data: params })

          if (res.code == 0) {
            this.$message.success('保存成功')
            this[dialog_name] = false
            this.eventBus.$emit('pageSizeChange', {})
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error('请检查必填项')
        }
      })
    },
    closeDialog(dialog_name) {
      this[dialog_name] = false
      this.$refs[dialog_name].resetFields()
      this.formData = Object.assign({})
    }
  }
}
</script>
<style lang="scss">
.dialogs {
  .el-dialog__header {
    background: #f2f0f3;
    padding: 15px;
  }
  .el-dialog__body {
    padding: 40px 20px;
  }
  .el-dialog__footer {
    text-align: center;
    padding-top: 0px;
    padding-bottom: 30px;
  }
  .confirm-dialog {
    .el-dialog__footer {
      text-align: center;
      padding-top: 0px;
      padding-bottom: 30px;
    }
    .el-textarea__inner {
      width: 100% !important;
    }
  }
  .edit-dialog {
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .confirm-audit {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .wl-select-tag {
    width: 200px;
    background: none;
    color: black;
    font-size: 14px;
    border: none;
    // margin-left: -5px;
    padding-left: 0px;
  }
  .tag-box {
    height: 40px;
    line-height: 40px;
  }
  .selected-box {
    padding-left: 15px;
  }
  .wl-placeholder-box {
    color: #beccd8;
  }
  .el-input.is-disabled .el-input__inner {
    color: black;
  }
  .refuse-reason {
    text-align: center;
    margin-top: 25px;
  }
}
</style>
