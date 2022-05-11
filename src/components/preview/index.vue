<template>
  <div class="Preview">
    <el-dialog :visible.sync="dialogFormVisible" fullscreen @close="closePreview">
      <div class="left">
        <div class="demo-image__lazy">
          <div v-for="(item, index) in previewList" :key="index">
            <el-image :key="item.url" :src="item.url" lazy @click="showDetail(item.url, item.fileType)" v-if="item.fileType == 'img'"></el-image>
            <el-image :key="item.url" :src="fileImg" lazy @click="showDetail(item.url, item.fileType)" v-else></el-image>
            <p class="file-title" v-bind:class="{ 'title-color': previewUrl == item.url }" @click="showDetail(item.url, item.fileType)">{{ item.filename }}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <preview-pdf ref="previewPdf" v-show="curType == 'pdf'"></preview-pdf>
        <preview-img ref="previewImg" v-show="curType == 'img'"></preview-img>
        <preview-xlsx ref="previewXls" v-show="curType == 'xlsx'"></preview-xlsx>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PreviewPdf from './preview-pdf'
import PreviewImg from './preview-img'
import PreviewXlsx from './preview-xls'

export default {
  name: 'Preview',
  components: {
    PreviewPdf,
    PreviewImg,
    PreviewXlsx
  },
  data() {
    return {
      dialogFormVisible: false,
      applyNum: '',
      fileImg: require('@/assets/img/preview.png'),
      previewList: [],
      curType: '',
      imgUrl: '',
      previewUrl: ''
    }
  },
  methods: {
    async showDetail(url, type) {
      if (url == this.previewUrl) {
        return
      }
      this.curType = type
      this.previewUrl = url
      if (this.curType == 'img') {
        this.$refs.previewImg.fileUrl = url
      } else if (this.curType == 'xlsx') {
        const paramStr = url.split('?')[1]
        const fileId = paramStr.split('=')[1]
        this.$refs.previewXls.fileUrl = fileId
      } else {
        const paramStr = url.split('?')[1]
        const fileId = paramStr.split('=')[1]
        const res = await this.$axios({ method: 'get', url: this.$DataConf.LogSealList.urls.previewDetail, data: { file: fileId } })
        if (res.type == 'application/json') {
          const reader = new FileReader()
          reader.readAsText(res, 'utf-8')
          const that = this
          reader.onload = function () {
            const data = JSON.parse(reader.result)
            that.$message.error(data.message)
          }
          return
        }
        const fileUrl = this.getObjectUrl(res)
        this.$refs.previewPdf.fileUrl = fileUrl
      }
    },
    getObjectUrl(data) {
      let src = ''
      if (window.createObjectURL) {
        src = window.createObjectURL(data)
      } else if (window.webkitURL != undefined) {
        try {
          src = window.webkitURL.createObjectURL(data)
        } catch (err) {
          console.log(err)
        }
      } else if (window.URL != undefined) {
        try {
          src = window.URL.createObjectURL(data)
        } catch (err) {
          console.log(err)
        }
      }

      return src
    },
    closePreview() {
      console.log('关闭窗口')
      this.curType = ''
      this.previewUrl = ''
      this.imgUrl = ''
    }
  },
  watch: {
    async applyNum(val) {
      const res = await this.$axios({ method: 'get', url: this.$DataConf.LogSealList.urls.previewList, data: { apply_num: val } })
      res.data.list.map(item => {
        if (item.filename.indexOf('png') != -1 || item.filename.indexOf('jpg') != -1) {
          item.fileType = 'img'
        } else if (item.filename.indexOf('xls') != -1 || item.filename.indexOf('xlsx') != -1) {
          item.fileType = 'xlsx'
        } else if (item.filename.indexOf('doc') != -1 || item.filename.indexOf('docx') != -1 || item.filename.indexOf('pdf') != -1) {
          item.fileType = 'pdf'
        }
        return true
      })
      this.previewList = res.data.list
      // 默认预览第一个文件
      if (this.previewList.length > 0) {
        this.showDetail(this.previewList[0].url, this.previewList[0].fileType)
      }
    }
  }
}
</script>

<style lang="scss">
.Preview {
  .el-dialog {
    overflow: hidden;
    border-radius: 0px;
    background: rgba(0, 0, 0, 0.3);
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__body {
    padding: 0px;
    display: flex;
  }
  .el-dialog__headerbtn {
    background: white;
    font-size: 32px;
  }
  .left {
    width: 200px;
    height: calc(100vh);
    overflow: scroll;
    padding-left: 20px;
    padding-right: 30px;
    padding-top: 50px;
    padding-bottom: 10px;
    background: rgba(0, 0, 0, 0.6);

    .demo-image__lazy {
      text-align: center;

      div:last-child {
        margin-bottom: 100px;
      }
    }

    .el-image {
      width: 100px;
      // height: 150px;
      margin-bottom: 10px;
    }

    .file-title {
      margin-bottom: 20px;
      color: white;
    }
    .title-color {
      color: #1ffb04;
    }
  }
  .right {
    // padding: 100px;
    height: calc(100vh);
    width: calc(100vw - 250px);
    display: flex;
    align-items: center;

    .previewImg {
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>
