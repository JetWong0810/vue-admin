<template>
  <div class="department-tree">
    <el-input placeholder="搜索部门" v-model="filterText"> </el-input>
    <el-tree class="filter-tree" :data="treeList" :props="defaultProps" node-key="id" :default-expanded-keys="defaultShowNodes" :highlight-current="true" :filter-node-method="filterNode" @current-change="getUserByDepId" ref="tree"> </el-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DepartmentTree',
  data() {
    return {
      filterText: '',
      defaultShowNodes: [],
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  inject: ['eventBus'],
  computed: {
    ...mapGetters(['pageName'])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeList: {
      handler() {
        this.treeList.forEach(item => {
          this.defaultShowNodes.push(item.id)
        })
      },
      immediate: true,
      deep: true
    }
  },

  async mounted() {
    console.log(this.$DataConf[this.pageName], this.pageName)
    const url = this.$DataConf[this.pageName].urls.listDep
    const res = await this.$axios({ method: 'get', url, data: {} })
    this.treeList = [{ id: res.data.list[0].id, name: res.data.list[0].name }]
    res.data.list.splice(0, 1)
    this.treeList[0].children = res.data.list
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getUserByDepId(node) {
      this.checkedKeys = []
      this.getChoosedDepts(node)
      if (this.checkedKeys.length > 0) {
        const params = { currentPage: 1, dept_id: this.checkedKeys.join(','), searchParams: { offset: 0 } }
        this.$Util.Common.emitToEvent(this, 'searchEvent', params)
      }
    },
    getChoosedDepts(node) {
      if (node.id) {
        this.checkedKeys.push(node.id)
      }
      if (node.children && node.children.length > 0) {
        node.children.map(item => {
          this.getChoosedDepts(item)
          return true
        })
      }
    }
  }
}
</script>
<style lang="scss">
.department-tree {
  .el-input .el-input__inner {
    border: none;
    border-bottom: 1px solid #d5d1d1;
  }
}
</style>
<style lang="scss" scoped>
.department-tree {
  border: 1px solid #d5d1d1;
  border-radius: 6px;
  background: white;

  .filter-tree {
    padding-top: 10px;
    padding-bottom: 20px;
    border-radius: 6px;
  }
}
</style>
