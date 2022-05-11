<template>
  <div style="height: 100%">
    <el-container>
      <!-- 页面左部菜单+logo -->
      <el-aside class="aside">
        <div class="left-top">
          <div class="logo-mobile" v-if="isCollapse" v-bind:style="{ width: sideBarWidth, transition: transformChange }">
            <img src="@/assets/img/mobile-logo.png" alt="" />
          </div>
          <div class="logo" v-else v-bind:style="{ width: sideBarWidth, transition: transformChange }">
            <img src="@/assets/img/logo.png" alt="" />
          </div>
        </div>
        <div class="sidebar-menu">
          <div style="height: 100%">
            <side-bar :isCollapse="isCollapse"></side-bar>
          </div>
        </div>
      </el-aside>
      <!-- 页面头部+主体内容部分 -->
      <el-container>
        <el-header class="header" v-bind:style="{ marginLeft: mainMarginLeft, transition: transformChange }">
          <div class="left">
            <div class="hide-sidebar" v-bind:style="{ transition: transformChange }">
              <Icon v-if="isCollapse" name="out" width="20" height="20" class="title-icon" @click.native="changeSlidebarState"></Icon>
              <Icon v-else name="collapse" width="20" height="20" class="title-icon" @click.native="changeSlidebarState"></Icon>
            </div>
          </div>
          <div class="center">
            <div v-if="!isCollapse" class="sidebar-title">{{ title }}</div>
          </div>
          <div class="right">
            <nav-bar></nav-bar>
          </div>
        </el-header>
        <el-main ref="main" v-bind:style="{ marginLeft: mainMarginLeft, transition: transformChange }">
          <div class="main-container">
            <app-main ref="appMain"></app-main>
            <div class="copyright">{{ copyright }}</div>
          </div>
        </el-main>
      </el-container>
      <div class="sidenav-mask" @click="changeSlidebarState"></div>
    </el-container>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from '@/components/layout'

const navBarHeight = 60 // header高度
const copyrightHeight = 48 // 历史记录栏与舞台的间距
const sideBarWidth = '210px'
const collapseSideBarWidth = '64px'
const totalHeight = navBarHeight + copyrightHeight + 60 // 总高度=头部高度+历史栏记录高度+两者间距

export default {
  data() {
    return {
      isCollapse: false, // 左侧菜单栏是否折叠
      sideBarWidth, // 左侧菜单栏展开的宽度
      clientWidth: 0, // 页面宽度
      clientHeight: 0, // 页面高度
      transformChange: '',
      sideBarMargin: 'auto auto',
      mainMarginLeft: '0px',
      title: window.SYSTEM_TITLE,
      copyright: window.COPYRIGHT
    }
  },
  mounted() {
    this.setResize()
    // 宽度768为界限，区分左侧菜单是否折叠
    if (this.clientWidth <= 768) {
      this.isCollapse = true
    } else {
      this.isCollapse = false
    }
    // 监测屏幕宽度 折叠左侧菜单栏
    window.onresize = () => {
      const that = this
      that.setResize()
      if (that.clientWidth <= 768) {
        if (that.isCollapse === false) {
          that.isCollapse = true
        }
      } else if (that.isCollapse === true) {
        that.isCollapse = false
      }
    }
  },
  inject: ['eventBus'],
  methods: {
    // 控制菜单折叠
    changeSlidebarState() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideBarWidth = collapseSideBarWidth
        this.transformChange = 'all 0.4s'
        this.sideBarMargin = 'auto 16px auto auto'
        this.mainMarginLeft = '-147px'
      } else {
        this.transformChange = 'all 0.4s'
        this.sideBarMargin = 'auto auto'
        this.mainMarginLeft = '0px'
      }
    },
    // 响应页面的宽度高度变化
    setResize() {
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      this.$refs.appMain.$el.style.minHeight = `${this.clientHeight - totalHeight + 30}px` // 计算主体内容最小高度
    }
  },
  watch: {
    isCollapse() {
      this.transX = 0
      this.sideBarWidth = this.isCollapse === false ? sideBarWidth : collapseSideBarWidth
    }
  },
  components: {
    NavBar,
    SideBar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.left-top {
  position: absolute;
  z-index: 1000;
  // border-bottom: 2px solid #585757;
  background: #ebf1f9;
  // background: -webkit-linear-gradient(left, #ffffe4, #dbdfff);
}
.logo {
  width: $sidebar-width;
  height: 100px;
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
.logo-mobile {
  width: $collapse-sidebar-width;
  height: 100px;
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
.sidebar-title {
  width: 81%;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
  text-align: center;
}
.sidebar-menu {
  height: 100%;
  padding-top: 100px;
  width: $sidebar-width;
}
.main-container {
  margin: 16px 16px 0px 16px;
}
.hide-sidebar {
  width: 100%;
  height: 60px;
  position: relative;
  color: #797979;
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
.aside {
  background: $sidebar-background;
  overflow-x: hidden;
  overflow-y: hidden;
  width: $sidebar-width !important;
  border: 0px !important;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.header {
  padding: 0;
  background: $header-background;
  background: -webkit-linear-gradient(left, $header-start-background, $header-end-background);
  height: $header-height !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 6px 0px rgba(190, 204, 216, 0.4);

  .left {
    flex-grow: 1;
    z-index: 1000;
    height: 60px;
  }

  .center {
    flex-grow: 2;
    color: white;
    font-size: 27px;
    font-weight: bolder;
  }

  .right {
    flex-grow: 1;
    float: right;
  }
}

.el-main {
  overflow-y: auto;
  position: relative;
  padding: 0;
  // border-left: 1px solid #D5D1D1;
}

.sidenav-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: none;
  cursor: pointer;

  &.show {
    display: block;
  }
}
.title-icon {
  width: 20px;
  height: 20px;
  color: white;
  margin: 20px 15px;
  cursor: pointer;
}
</style>
