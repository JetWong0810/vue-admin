<template>
  <div class="app-sidebar">
    <el-menu class="el-menu-vertical-demo" :default-active="currentMenu" :router="true" @open="handleOpen" @close="handleClose" background-color="#324c64" text-color="#bfcbd9" active-text-color="#f6ff69">
      <template v-for="(item, index) in menuList">
        <el-submenu :index="item.name" v-if="item.children.length > 0" :key="index">
          <template slot="title">
            <Icon :name="item.icon" scale="2" class="el-icon-menu"></Icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="child.name" v-for="(child, childIndex) in item.children" :key="childIndex" :route="{ path: child.route }">{{ child.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.name" v-else :key="index" :route="{ path: item.route }">
          <Icon :name="item.icon" scale="2" class="el-icon-menu"></Icon>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menuList from '@/mock/menu-list'

export default {
  data() {
    return {
      sidebar: '',
      menuList: [],
      currentMenu: ''
    }
  },
  inject: ['eventBus'],
  async mounted() {
    // 调用接口获取当前页面菜单 todo
    this.menuList = menuList
    this.menuList.map(item => {
      if (item.route == this.$route.path) {
        this.currentMenu = item.name
      }
      if (item.children && item.children.length > 0) {
        item.children.map(child => {
          if (child.route == this.$route.path) {
            this.currentMenu = child.name
          }
        })
      }
    })
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  },
  computed: {
    ...mapGetters(['sideBarList'])
  },
  watch: {}
}
</script>
<style lang="scss">
.el-menu {
  border-right: 0px;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-submenu__title {
  padding: 0 25px !important;
}
.el-menu > .el-menu-item {
  padding: 0 25px !important;
}
.el-menu-item-group .el-menu-item {
  padding-left: 55px !important;
}
</style>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
li:hover {
  background: $menuItem-hover !important;
}
.app-sidebar {
  background: $sidebar-background;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
