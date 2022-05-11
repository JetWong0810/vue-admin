<template>
  <div class="user">
    <span class="el-dropdown-link">
      <div class="nav-avatar"><img :src="avatarUrl || defaultAvatar" alt="头像" /></div>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import defaultAvatar from '@/assets/img/user.png'

export default {
  name: 'user',
  components: {},
  data() {
    return {
      username: null,
      nickname: '',
      defaultAvatar,
      avatarUrl: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {},
  created() {
    this.init()
  },
  methods: {
    ...mapActions(['loginOut', 'setUserAndState']),
    ...mapMutations({
      removecommonConf: 'REMOVE_COMMON_CONFIG'
    }),
    init() {
      const { user } = this.$store.state
      this.username = user && user.username ? user.username : 'jetwong.wang'
      this.nickname = user && user.nickname ? user.nickname : '王峥'
      if (!this.username) {
        this.$message.error('当前用户信息不存在，请重新登录！')
        this.outLogin()
      }
      if (this.username != 'admin' && this.username != 'system') {
        this.avatarUrl = `http://uc.happyelements.net/admin/data2/small-pic/${this.username}.jpg`
      }
    },
    async clearCache() {
      this.removecommonConf() // 删除全局配置
      //   await Config.getCommon() // 拉取全局通用配置
      this.$message.success('清除缓存成功')
    },
    outLogin() {
      window.location.reload(true)
      this.loginOut()
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  height: 40px;

  .el-dropdown-link {
    cursor: pointer;

    .nav-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
  }
}
</style>
