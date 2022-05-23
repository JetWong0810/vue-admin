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
    <el-dialog title="新增记录" :visible.sync="editDialog" width="30%" class="infoDialog">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="editDialog">
        <el-form-item label="部门名称: " prop="dept_id">
          <wlTreeSelect width="250" :data="pageConf.orgList" @change="depChange" v-model="formData.dept_id" filterable> </wlTreeSelect>
        </el-form-item>
        <el-form-item label="成本中心: " prop="code_name">
          <el-select v-model="formData.code_name" placeholder="请选择" style="width: 250px" disabled>
            <el-option v-for="(item, index) in pageConf.feeDepartmentList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level_1: " prop="level_1">
          <el-select v-model="formData.level_1" filterable clearable placeholder="请选择" style="width: 250px">
            <el-option v-for="(item, index) in pageConf.userList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level_2: " prop="level_2">
          <el-select v-model="formData.level_2" filterable clearable placeholder="请选择" style="width: 250px">
            <el-option v-for="(item, index) in pageConf.userList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level_3: " prop="level_3">
          <el-select v-model="formData.level_3" filterable clearable placeholder="请选择" style="width: 250px">
            <el-option v-for="(item, index) in pageConf.userList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level_4: " prop="level_4">
          <el-select v-model="formData.level_4" filterable clearable placeholder="请选择" style="width: 250px">
            <el-option v-for="(item, index) in pageConf.userList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Level_5: " prop="level_5">
          <el-select v-model="formData.level_5" filterable clearable placeholder="请选择" style="width: 250px">
            <el-option v-for="(item, index) in pageConf.userList" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否默认: " prop="is_default">
          <el-radio-group v-model="formData.is_default">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSave('editDialog')">确 定</el-button>
        <el-button @click="dialogClose('editDialog')">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 上传弹框 -->
    <el-dialog title="上传文件" :visible.sync="uploadDialog" width="30%" center destroy-on-close>
      <el-form>
        <el-upload action="" ref="upload" :limit="1" :file-list="fileList" accept=".xlsx,.xls" :auto-upload="false" :http-request="uploadFile">
          <el-button style="width: 90px" slot="trigger" size="small" type="primary">选择文件</el-button>
          <el-button style="margin-left: 20px; width: 90px" size="small" type="info" @click="downloadTemplate">下载模板</el-button>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="margin-left: 10px; width: 80px" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button @click="uploadClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import listMixin from '@/core/mixin/list.js'
export default {
  mixins: [listMixin],
  data() {
    return {
      editDialog: false,
      uploadDialog: false,
      fileList: [],
      formData: {},
      pageConf: {},
      rules: {}
    }
  },
  mounted() {
    this.$Util.Common.registerBusEvent(this, 'listEvent' + this.pageName, 'processEvent')
    this.$Util.Common.registerBusEvent(this, 'permitBtnEvent' + this.pageName, 'processBtnEvent')

    const params = { currentPage: 1, searchParams: { offset: 0, filter: { status: '启用' } } }
    this.$Util.Common.emitToEvent(this, 'searchEvent', params)
  },
  methods: {
    processBtnEvent(data) {
      console.log(data)
    },
    edit(data) {
      //   const url = this.$DataConf[this.pageName].urls.editPage
      //   const params = { unique_id: data.unique_id }
      //   this.$router.push({ path: url, query: params })
    },
    async showEditDialog(row = {}, data = {}) {
      this.editDialog = true
      if (!this.pageConf.orgList) {
        const orgRes = await this.$axios({ method: 'get', url: this.$DataConf.Api.commonApi.orgList, data: {} })
        this.$set(this.pageConf, 'orgList', orgRes.data.list)
      }
      if (!this.pageConf.userList) {
        const userRes = await this.$axios({ method: 'get', url: this.$DataConf.Api.commonApi.userList, data: {} })
        this.$set(this.pageConf, 'userList', userRes.data.list)
      }
      if (row.id) {
        this.formData.id = row.id
        const editRes = await this.$axios({ method: 'get', url: this.$DataConf[this.pageName].urls.edit, data: { id: row.id } })
        const { dept_id, code_id, level_1, level_2, level_3, level_4, level_5, is_default } = editRes.data.data[0]
        const code_name = `${editRes.data.data[0].code_info.name}(${editRes.data.data[0].code_info.code})`
        this.formData = Object.assign({}, this.formData, { dept_id, code_id, code_name, level_1, level_2, level_3, level_4, level_5, is_default })
      } else {
        this.$set(this.formData, 'is_default', 0)
      }
    },
    depChange(val) {
      this.formData.dept_id = val[0].id
      this.formData.code_id = val[0].code_id
      this.formData.code_name = val[0].code_name
    },
    dialogSave(dialogName) {
      this.$refs[dialog_name].validate(async valid => {
        if (valid) {
          const params = this.formData
          let url = ''
          if (params.id) {
            url = this.$DataConf[this.pageName].urls.update
          } else {
            url = this.$DataConf[this.pageName].urls.save
          }
          console.log('编辑或保存参数:', url, params)
          const res = await this.$axios({ method: 'post', url, data: params })

          if (res.code == 0) {
            this.$message.success('保存成功')
            this[dialog_name] = false
            this.$Util.Common.emitToEvent(this, 'searchEvent', {})
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error('请检查表单填写信息')
        }
      })
    },
    dialogClose(dialogName) {
      this[dialogName] = false
      this.$refs[dialogName].resetFields()
      this.formData = Object.assign({})
    },
    showUploadDialog() {
      this.uploadDialog = true
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    async downloadTemplate() {
      const res = await this.$axios({ method: 'get', url: this.$DataConf[this.pageName].urls.downloadTemplate, data: {} })
      window.location.href = res.data.url
    },
    async uploadFile(params) {
      const uploadData = { file: params.file }
      const res = await this.$axios({ method: 'post', url: this.$DataConf[this.pageName].urls.upload, data: uploadData })
      const toastMsg = `操作成功 ${res.data.data.success}，失败 ${res.data.data.fail}`
      this.$message({ message: toastMsg, type: 'success' })
    },
    uploadClose() {
      this.uploadDialog = false
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
