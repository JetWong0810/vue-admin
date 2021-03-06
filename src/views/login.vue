<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <Icon name="user" scale="2" class="login-icon"></Icon>
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <Icon name="password" scale="2" class="login-icon"></Icon>
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <Icon name="eye" scale="2" class="login-icon" v-if="passwordType === 'password'"></Icon>
          <Icon name="eye-open" scale="2" class="login-icon" v-else></Icon>
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import AppConfig from '@/config/index'
export default {
  data() {
    return {
      loginForm: {
        username: 'yongtian.li',
        password: '123456'
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      title: window.SYSTEM_TITLE
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const loginRes = await this.$axios({ method: 'get', url: this.$DataConf.Api.commonApi.login, data: this.loginForm })
          if (loginRes.code != 0) {
            this.loading = false
            this.$message.error(loginRes.message)
            return
          }
          this.setToken(loginRes.data.token)
          const userinfo = await this.$axios({ method: 'get', url: this.$DataConf.Api.commonApi.userinfo, data: {} }) // 获取用户信息
          this.setUserinfo(userinfo.data)

          const commonConf = await this.$axios({ method: 'get', url: this.$DataConf.Api.commonApi.commonList, data: {} })
          this.setCommonConf(commonConf.data)

          if (this.$route.query && this.$route.query.redirectRoute) {
            this.$router.push({ path: this.$route.query.redirectRoute })
          } else {
            this.$router.push(AppConfig.defaultRoute)
            this.$message.success('登录成功')
          }

          this.loading = false
        } else {
          console.log('登录校验不通过')
          this.loading = false
        }
      })
    },
    ...mapActions(['setUserinfo']),
    ...mapMutations({
      setToken: 'SET_TOKEN',
      setCommonConf: 'SET_COMMON_CONFIG'
    })
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content {
    text-align: left;
  }
  .el-button {
    padding: 10px;
    font-size: 15px;
    height: unset;
    letter-spacing: 2px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  box-sizing: border-box;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .login-btn {
      width: 100%;
      margin-bottom: 30px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    .login-icon {
      margin: -2px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
