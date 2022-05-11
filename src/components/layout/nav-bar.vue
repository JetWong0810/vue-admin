<template>
  <div class="app-nav-bar">
    <div class="nav-content">
      <!-- 暂时放这里 -->
      <div class="right-info">
        <user></user>
        <div class="headerOperation">
          <el-dropdown class="dropdownBtn" @command="accountAction">
            <el-button> 张三丰<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updateCache">更新缓存</el-dropdown-item>
              <!--<el-dropdown-item command="changeAccount" v-if="enviroment != 'prod'">切换账号</el-dropdown-item>-->
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import User from './user'

export default {
  name: 'NavBar',
  created() {},
  watch: {},
  data() {
    return {
      value: 0,
      hidden: true,
      messages: [],
      enviroment: process.env.VUE_APP_CURRENTMODE
    }
  },
  methods: {
    ...mapActions(['loginOut', 'setUserAndState', 'setUserPermissions']),
    ...mapMutations({
      removecommonConf: 'REMOVE_COMMON_CONFIG'
    }),
    // 账号操作
    async accountAction(action) {
      if (action == 'updateCache') {
        this.removecommonConf() // 删除全局配置
        const user = {}
        // const user = await UserApi.getUserInfo() // 获取用户信息
        // await Config.getCommon() // 拉取全局通用配置
        this.setUserAndState(user) // 设置用户登录标志，存储用户信息
        this.setUserPermissions(user) // 处理用户权限
        this.$message.success('更新缓存成功')
      } else if (action == 'changeAccount') {
        this.$router.push({ path: '/login', query: { type: 'changeAccount' } })
      } else if (action == 'logout') {
        window.location.reload(true)
        this.loginOut()
      }
    }
  },
  components: {
    User
  }
}
</script>
<style>
.headerOperation .dropdownBtn .el-button {
  width: 65px;
  padding: 0px;
  border: 0px;
  color: white;
  background: #33304d;
  font-size: 13px;
}
.el-dropdown-menu__item {
  padding: 0px 14px;
  font-size: 13px;
}
</style>
<style lang="scss" scoped>
.lin-notify {
  margin-right: 20px;
}
.app-nav-bar {
  width: 100%;
  height: $navbar-height;
  display: flex;
  align-items: center;
  .logo.js-min-logo {
    width: 60px;
    font-size: 16px;
    color: #fff;
  }
  .nav-content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: $navbar-padding;
    .right-info {
      display: flex;
      flex: 1;
      position: absolute;
      right: 20px;
      align-items: center;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
