<template>
  <div style="height: 100%">
    <el-container>
      <!-- 页面头部 -->
      <el-header class="header" ref="header">
        <div class="header-logo">
          <div class="logo">
            <img src="@/assets/img/logo.png" alt="" />
          </div>
        </div>
        <div class="header-content">
          <div class="left">
            <div class="app-box">
              <Icon name="contract" scale="2.7"></Icon>
              <p>合同</p>
            </div>
            <div class="app-box">
              <Icon name="loan" scale="2.7"></Icon>
              <p>请款</p>
            </div>
            <div class="app-box">
              <Icon name="exp" scale="2.7"></Icon>
              <p>报销</p>
            </div>
            <div class="app-box">
              <Icon name="purchase" scale="2.7"></Icon>
              <p>采购</p>
            </div>
            <div class="app-box">
              <Icon name="set" scale="2.7"></Icon>
              <p>系统设置</p>
            </div>
          </div>
          <div class="right">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2" class="search-box"></el-input>
            <Icon name="message" scale="4.5" class="message-tips"></Icon>
            <div><img class="nav-avatar" src="http://uc.happyelements.net/admin/data2/small-pic/jetwong.wang.jpg" alt="头像" /></div>
            <div class="nickname-box">
              <el-dropdown class="dropdownBtn" @command="accountAction">
                <el-button>张三丰<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="updateCache">更新缓存</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 页面左部菜单 -->
      <el-container>
        <el-aside class="aside" ref="aside">
          <div style="height: 100%">
            <side-bar :isCollapse="isCollapse"></side-bar>
          </div>
        </el-aside>
        <!-- 页面主体 -->
        <el-main ref="main">
          <div class="main-container">
            <app-main ref="appMain"></app-main>
            <div class="copyright">{{ copyright }}</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { SideBar, AppMain } from '@/components/layout'

const navBarHeight = 70 // header高度
const copyrightHeight = 48 // 历史记录栏与舞台的间距
const totalHeight = navBarHeight + copyrightHeight + 70 // 总高度=头部高度+历史栏记录高度+两者间距

export default {
  data() {
    return {
      isCollapse: false, // 左侧菜单栏是否折叠
      clientHeight: 0, // 页面高度
      title: window.SYSTEM_TITLE,
      copyright: window.COPYRIGHT
    }
  },
  mounted() {
    this.setResize()
  },
  inject: ['eventBus'],
  methods: {
    // 响应页面的宽度高度变化
    setResize() {
      this.clientHeight = document.body.clientHeight
      this.$refs.appMain.$el.style.minHeight = `${this.clientHeight - totalHeight + 30}px` // 计算主体内容最小高度
    }
  },
  watch: {},
  components: {
    SideBar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0;
  background: $header-background;
  background: -webkit-linear-gradient(left, $header-start-background, $header-end-background);
  height: $header-height !important;
  box-shadow: 0px 2px 6px 0px rgba(190, 204, 216, 0.4);
  display: flex;

  .header-logo {
    width: 210px;

    .logo {
      width: $sidebar-width;
      height: $header-height;
      position: relative;

      img {
        width: auto;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        margin: auto;
        bottom: 0px;
      }
    }
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 210px);
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;

      .app-box {
        width: 80px;
        margin-right: 40px;
        text-align: center;
      }

      p {
        color: white;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-top: 4px;
      }
    }

    .center {
      flex-grow: 2;
      color: white;
      font-size: 27px;
      font-weight: bolder;
    }

    .right {
      display: flex;
      align-items: center;

      .nickname-box {
        margin-right: 25px;

        /deep/ .el-button {
          background: unset;
          border: 0px;
          color: white;
          font-size: 14px;
        }
      }
      .message-tips {
        margin-right: 30px;
      }

      .search-box {
        margin-right: 50px;
      }

      .nav-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      /deep/ .el-input__inner {
        width: 300px;
        border-radius: 8px;
      }
    }
  }
}
.aside {
  overflow-x: hidden;
  overflow-y: hidden;
  width: $sidebar-width !important;
  border: 0px !important;
  padding-top: 18px;
  background: $sidebar-background;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.el-main {
  overflow-y: auto;
  position: relative;
  padding: 0;
  // border-left: 1px solid #D5D1D1;

  .main-container {
    margin: 16px 16px 0px 16px;
  }

  .copyright {
    display: block;
    align-items: center;
    justify-content: center;
    line-height: 48px;
    color: #797979;
    font-size: 13px;
    text-align: center;
  }
}
</style>
