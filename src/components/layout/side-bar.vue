<template>
  <div class="app-sidebar">
    <el-menu class="el-menu-custom" ref="meun" :default-active="defaultActive" :collapse="elMenuCollapse" background-color="#324c64" text-color="#bfcbd9" active-text-color="#f6ff69">
      <template v-for="item in sideBarList">
        <el-submenu class="subMenuContent" v-if="item.children" :key="idMap[item.name]" :index="idMap[item.name]">
          <template slot="title">
            <span v-if="isCollapse"></span>
            <i v-if="!filterIcon(item.icon)" :class="item.icon"></i> <Icon v-else :name="getMenuIcon(item.icon)" scale="1.8" class="img-icon"></Icon>
            <span slot="title">{{ item.title }}</span>
            <span v-bind:class="{ 'bage-num-company': license_total + stamp_total > 0 }" v-if="['审批管理'].includes(item.title) && license_total + stamp_total > 0" style="left: 115px">{{ license_total + stamp_total }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="subItem in item.children">
            <el-submenu v-if="subItem.children" :key="idMap[subItem.name]" :index="idMap[subItem.name]" class="subMenuContent">
              <template slot="title">
                <span slot="title" class="two-folder">{{ subItem.title }}</span>
              </template>

              <!-- 三级菜单 -->
              <router-link v-for="grandchildItem in subItem.children" :key="idMap[grandchildItem.name]" :to="grandchildItem.path" class="circle third">
                <el-menu-item :index="idMap[grandchildItem.name]" style="padding-left: 80px" class="subMenuContent">
                  {{ grandchildItem.title }}
                </el-menu-item>
              </router-link>
            </el-submenu>
            <!-- 二级else -->
            <router-link :to="subItem.path" :key="subItem.name" v-else>
              <el-menu-item :index="idMap[subItem.name]" style="line-height: 52px" class="subMenuContent">
                {{ subItem.title }}
                <span v-bind:class="{ 'bage-num-company': license_total > 0 }" v-if="['证照审批管理'].includes(subItem.title) && license_total > 0">{{ license_total }}</span>
                <span v-bind:class="{ 'bage-num-other': stamp_total > 0 }" v-if="['印章审批管理'].includes(subItem.title) && stamp_total > 0">{{ stamp_total }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>

        <!-- 一级else -->
        <el-menu-item class="subMenuContent" :index="idMap[item.name]" @click="goto(item.path)" v-else :key="idMap[item.name]">
          <i v-if="!filterIcon(item.icon)" :class="item.icon"></i> <Icon v-else :name="getMenuIcon(item.icon)" scale="1.8" class="img-icon"></Icon>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      sidebar: '',
      showSystemName: true,
      foldState: false, // 控制左侧菜单栏按键
      license_total: 0,
      stamp_total: 0
    }
  },
  inject: ['eventBus'],
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
    // 处理菜单排序问题
    // this.setMenuSort()
    // 获取小红点数字
    // const res = await this.$axios({ method: 'get', url: API.commonApi.bageNum, data: {} })
    // this.license_total = res.data.license_total
    // this.stamp_total = res.data.stamp_total
  },
  methods: {
    // 控制菜单折叠
    changeSlidebarState() {
      this.isCollapse = !this.isCollapse // eslint-disable-line
      if (this.isCollapse) {
        this.showSystemName = false
      } else {
        this.showSystemName = true
      }
      this.foldState = !this.foldState
    },
    goto(path) {
      this.$router.push({
        path
      })
    },
    filterIcon(icon) {
      return icon.indexOf('/') !== -1
    },
    getMenuIcon(iconName) {
      return iconName.split('/')[1]
    },
    setMenuSort() {
      const menuSortMap = this.$store.state.user.menu_list
      this.sideBarList.map(item => {
        item.sort = menuSortMap[item.permission]
        if (item.children && item.children.length > 0) {
          item.children.map(child => {
            child.sort = menuSortMap[child.permission]
            if (child.children && child.children.length > 0) {
              child.children.map(grandson => {
                grandson.sort = menuSortMap[grandson.permission]
                return true
              })
            }
            return true
          })
        }
        return true
      })
      this.sideBarList.sort(this.$Util.Util.Compare('sort'))
      this.sideBarList.map(item => {
        if (item.children && item.children.length > 0) {
          item.children.sort(this.compare('sort'))
          if (item.children.children && item.children.children.length > 0) {
            item.children.children.sort(this.$Util.Util.Compare('sort'))
          }
        }
        return true
      })
      this.$forceUpdate()
    }
  },
  computed: {
    elMenuCollapse() {
      return this.isCollapse
    },
    // 根据当前路由设置激活侧边栏
    defaultActive() {
      for (let i = this.stageInfo.length - 1; i >= 0; i -= 1) {
        if (this.idMap[this.stageInfo[i].name]) {
          return this.idMap[this.stageInfo[i].name]
        }
      }
      return ''
    },
    stageInfo() {
      return this.$store.getters.getStageInfo(this.$route.name)
    },
    // 由于index不支持symbol格式, 因此使用 idMap 进行映射
    idMap() {
      const { sideBarList } = this
      const mapData = {}
      const deepTravel = (obj, fuc) => {
        if (Array.isArray(obj)) {
          obj.forEach(item => {
            deepTravel(item, fuc)
          })
          return
        }
        if (obj && obj.children) {
          fuc(obj)
          deepTravel(obj.children, fuc)
          return
        }
        if (obj.name) {
          fuc(obj)
        }
      }
      deepTravel(sideBarList, item => {
        mapData[item.name] = this.$Util.Util.getRandomStr()
      })

      return mapData
    },
    imgSrc() {
      return this.elMenuCollapse === false ? '../../assets/image/left-logo.png' : '../../assets/image/logo.png'
    },
    ...mapGetters(['sideBarList'])
  },
  watch: {
    '$store.state.license_total': {
      handler(val) {
        this.license_total = val
      }
    },
    '$store.state.stamp_total': {
      handler(val) {
        this.stamp_total = val
      }
    }
  }
}
</script>
<style lang="scss">
.app-sidebar {
  .el-tooltip {
    line-height: 56px;
    height: 56px;
  }
}
.el-menu-custom {
  border-right: 0px;
}
.el-menu--inline .el-menu-item {
  padding-left: 52px !important;
  background: #1f2d3d !important;
}
.el-menu--collapse .el-menu-item {
  text-align: center;
}
.el-menu--collapse .img-icon {
  margin-right: 0px !important;
}
.el-menu--collapse .el-submenu__title {
  text-align: center;
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
.bage-num-company {
  position: absolute;
  top: 10px;
  left: 145px;
  background: red;
  color: white;
  z-index: 2000;
  font-size: 13px;
  border-radius: 16px;
  padding: 2px 8px;
  height: 16px;
  line-height: 16px;

  &:hover {
    background: red !important;
    color: white !important;
  }
}
.bage-num-other {
  position: absolute;
  top: 10px;
  left: 145px;
  background: red;
  color: white;
  z-index: 2000;
  font-size: 13px;
  border-radius: 16px;
  padding: 2px 8px;
  height: 16px;
  line-height: 16px;
}
.app-sidebar {
  background: $sidebar-background;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  // .subMenuContent {
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   line-height: 40px;
  //   color: #565555;

  //   &:hover {
  //     color: white!important;
  //     background: $menuItem-hover!important;
  //   }
  //   span {
  //     // font-weight: bolder;
  //   }
  // }

  .logo {
    width: $sidebar-width;
    height: $header-height;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #fff;
    transition: all 0.5s ease-in-out;
    background-color: $sidebar-background;
    transition: all 0.3s linear;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;

    img {
      width: 200px;
      transition: all 0.3s linear;
    }
  }

  .mobile-logo {
    width: 60px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $sidebar-background;
    transition: all 0.3s linear;

    img {
      width: 40px;
      height: 40px;
      transition: all 0.3s linear;
    }
  }

  .img-icon {
    margin-right: 16px;
  }
}
</style>
