<template>
  <div class="OrganizationEdit">
    <div class="title-box">
        <span>编辑信息</span>
    </div>
    <div class="base-info">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">姓名:</el-col>
                    <el-col :span="18" class="info-value">{{formData.c_username}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">工号:</el-col>
                    <el-col :span="18" class="info-value">{{formData.unique_id}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="10">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">邮箱:</el-col>
                    <el-col :span="18" class="info-value">{{formData.email}}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">手机号:</el-col>
                    <el-col :span="18" class="info-value">{{formData.mobile}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">所属部门:</el-col>
                    <el-col :span="18" class="info-value">{{formData.department_name}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="10">
                <el-row :gutter="10">
                    <el-col :span="6" class="info-title">成本中心:</el-col>
                    <el-col :span="18" class="info-value">{{formData.code_name}}</el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <div class="editForm">
        <el-form :model="formData" status-icon :rules="rules" class="edit-form" label-position="right" ref="editForm" label-width="140px">
            <el-form-item label="角色:" prop="role">
                <el-select v-model="formData.role" multiple placeholder="请选择" class="setWidth">
                    <el-option v-for="(item,index) in roleList" :key="index" :label="item" :value="parseInt(index)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
                <el-input type="textarea" v-model="formData.remark" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
            </el-form-item>
        </el-form>
    </div>
    <div class="formBtn">
        <el-button type="primary" @click="submitForm()">保 存</el-button>
        <el-button type="info" @click="$router.go(-1)">返 回</el-button>
    </div>
  </div>
</template>

<script>
import * as DataConfig from '@/data/index.js'

export default {
  data() {
    return {
      formData: {},
      editConfig: {},
      rules: {
        role: [{ trigger: ['blur'], required: true, message: '角色不能为空' }],
        remark: [{ min: 0, max: 200, message: '长度在 0 到 200 个字符' }]
      },
      unique_id: '',
      roleList: {},
    }
  },
  async mounted() {
    this.unique_id = this.$route.query && this.$route.query.unique_id
    if (this.unique_id) {
      const res = await this.$axios({ method: 'get', url: DataConfig.OrganizationList.urls.edit, data: { unique_id: this.unique_id } })
      this.formData = res.data.data[0]  // eslint-disable-line
      const roles = this.formData.role.map(item => item.app_role_id)
      this.formData.role = []
      // 获取角色列表
      const roleRes = await this.$axios({ method: 'get', url: DataConfig.OrganizationList.urls.roleList, data: {} })
      this.roleList = roleRes.data.list
      this.formData.role = roles.filter(item => this.roleList[item])
    } else {
      this.$message.error('工号参数错误')
      this.$router.push('/system/organization/list')
    }
  },
  methods: {
    async submitForm() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const params = { unique_id: this.unique_id, app_role_ids: JSON.stringify(this.formData.role), remark: this.formData.remark }
          const url = DataConfig.OrganizationList.urls.save
          console.log('保存请求url地址和参数:', url, params)
          const res = await this.$axios({ method: 'post', url, data: params })
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$router.go(-1)
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error('表单信息校验失败')
        }
      })
    }
  },
}
</script>
<style lang="scss">
.OrganizationEdit {
    .el-row {
        margin-bottom: 18px;
    }
    .el-form-item__label {
        font-size: 16px;
    }
    .el-textarea {
        width: 40%;
    }
    .setWidth .el-input__inner {
        width: 400px!important;
    }
}
</style>
<style lang="scss" scoped>
.OrganizationEdit {
    background: #FFFFFF;
    border: 1px solid #D5D1D1;
    border-radius: 6px;

    .title-box {
        height: 50px;
        background: #ebf1f9;
        color: black;
        border-radius: 6px;

        span {
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            margin-left: 15px;
            letter-spacing: 2px;
        }
    }
    .base-info {
        margin: 36px 50px;

        .info-title {
            text-align: right;
        }
        .info-value {
            text-align: left;
        }
    }
}
.formBtn {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 30px;
}
</style>
