<template>
  <div class="home" ref="xlsxPreview" v-loading="loading" element-loading-text="拼命加载中">
    <div v-html="xlsHtml"></div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx/xlsx.mjs'
import axios from 'axios'

export default {
  data() {
    return {
      xlsHtml: null,
      fileUrl: '',
      loading: false
    }
  },
  mounted() {},
  watch: {
    fileUrl(val) {
      this.loading = true
      axios({
        method: 'get',
        responseType: 'arraybuffer', // 设置响应文件格式
        url: `/api/stamp/attachmentPreview?file=${val}`,
        params: { fileType: 'xlsx' },
        headers: { Authorization: localStorage.getItem('token') }
      }).then(data => {
        let binary = ''
        const bytes = new Uint8Array(data)
        const length = bytes.byteLength
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        const wb = XLSX.read(binary, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const xlsHtml = XLSX.utils.sheet_to_html(ws)
        this.xlsHtml = xlsHtml
        this.$nextTick(() => {
          const tableObj = document.getElementsByTagName('table')
          const tbodyObj = document.getElementsByTagName('tbody')
          const tableObjIndex = tableObj.length - 1
          const tbodyObjIndex = tbodyObj.length - 1
          if (tbodyObj[tbodyObjIndex].offsetHeight < 600) {
            tableObj[tableObjIndex].style.height = `${tbodyObj[tbodyObjIndex].offsetHeight}px`
          } else {
            tableObj[tableObjIndex].style.height = '600px'
          }
          if (tbodyObj[tbodyObjIndex].offsetWidth < 800) {
            tableObj[tbodyObjIndex].style.width = `${tbodyObj[tbodyObjIndex].offsetWidth}px`
          } else {
            tableObj[tbodyObjIndex].style.width = '800px'
          }
        })
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 50%;
  margin: 0 auto;

  /deep/ table {
    display: block;
    overflow: scroll;
    height: calc(90vh);
  }
  /deep/ tr {
    line-height: 26px;
    border: 1px solid black;
    background: white;
  }
  /deep/ td {
    border: 1px solid black;
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    padding: 3px 6px;
  }

  /deep/ .el-loading-spinner .path {
    stroke: white;
  }

  /deep/ .el-loading-spinner .el-loading-text {
    color: white;
  }
}
</style>
