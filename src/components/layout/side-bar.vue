<template>
  <div class="app-sidebar">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#324c64" text-color="#bfcbd9" active-text-color="#f6ff69">
      <el-submenu index="1">
        <template slot="title">
          <Icon name="set" scale="2" class="el-icon-menu"></Icon>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <Icon name="set" scale="2" class="el-icon-menu"></Icon>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <Icon name="set" scale="2" class="el-icon-menu"></Icon>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <Icon name="set" scale="2" class="el-icon-menu"></Icon>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      sidebar: ''
    }
  },
  inject: ['eventBus'],
  async mounted() {
    // 处理菜单排序问题
    // this.setMenuSort()
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
