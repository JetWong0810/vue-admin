<template>
  <div class="page-container">
    <div class="main" v-bind:style="{ width: containerWidth + '%' }">
      <pdf :src="src" :page="currentPage" @progress="loadedRatio = $event" @loaded="loadPdfHandler" @num-pages="pageCount = $event" @page-loaded="currentPage = $event" @error="catchError" ref="wrapper" class="pdf"></pdf>
    </div>
    <ul class="footers">
      <li :class="{ select: idx == 0 }" @touchstart="idx = 0" @touchend="idx = -1" @click="scaleD">
        <p class="more-p">+</p>
      </li>
      <li :class="{ select: idx == 1 }" @touchstart="idx = 1" @touchend="idx = -1" @click="scaleX">
        <p class="small-p">-</p>
      </li>
      <li :class="{ select: idx == 2 }" @touchstart="idx = 2" @touchend="idx = -1" @click="changePdfPage(0)">
        <p class="up-p"><</p> <!--eslint-disable-line-->
      </li>
      <li :class="{ select: idx == 3 }" @touchstart="idx = 3" @touchend="idx = -1" @click="changePdfPage(1)">
        <p class="down-p">></p>
      </li>
      <li>
        <p class="page-style">当前第{{ currentPage }}页/共{{ pageCount }}页</p>
      </li>
    </ul>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      pageCount: 0, // 总页码
      scale: 100,
      idx: -1,
      loadedRatio: 0,
      src: '',
      containerWidth: 35,
      fileUrl: '',
      numPages: 1
    }
  },
  created() {
    // this.src = pdf.createLoadingTask(this.src) // 处理一下跨域
  },
  components: {
    pdf
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    // pdf加载时
    loadPdfHandler(e) {
      console.log(e)
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    // 放大
    scaleD() {
      this.containerWidth += 3
    },

    catchError(e) {
      console.log(e)
      this.$message.error('预览附件出错，请下载')
    },

    // 缩小
    scaleX() {
      if (this.containerWidth == 35) {
        return
      }
      this.containerWidth -= 3
    }
  },
  watch: {
    fileUrl(val) {
      this.containerWidth = 35
      this.currentPage = 1
      this.src = pdf.createLoadingTask(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
}
.main {
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 40px;
}
.footers {
  position: fixed;
  bottom: 30px;
  width: calc(100vw - 250px);
  display: flex;
  z-index: 100;
  color: white;
  line-height: 40px;
  height: 40px;
  margin: 0 auto;
  justify-content: center;
}
.li {
  text-align: center;
  flex: 1;
  padding: 5px;
  cursor: pointer;
}
.ul {
  list-style: none;
}
.more-p {
  margin-left: 20px;
  margin-right: 40px;
  cursor: pointer;
  background: #474646;
  border-radius: 24px;
  padding: 3px 12px;
  font-size: 24px;
  font-weight: bold;
  height: 34px;
  line-height: 30px;
}
.small-p {
  margin-right: 40px;
  cursor: pointer;
  background: #474646;
  border-radius: 24px;
  padding: 3px 12px;
  font-size: 24px;
  font-weight: bold;
  height: 34px;
  line-height: 30px;
}
.up-p {
  margin-right: 40px;
  cursor: pointer;
  background: #474646;
  border-radius: 24px;
  padding: 3px 12px;
  font-size: 24px;
  font-weight: bold;
  height: 34px;
  line-height: 30px;
}
.down-p {
  border-radius: 0 none;
  cursor: pointer;
  margin-right: 20px;
  background: #474646;
  border-radius: 24px;
  padding: 3px 12px;
  font-size: 24px;
  font-weight: bold;
  height: 34px;
  line-height: 30px;
}
.page-desc {
  color: #474646;
  font-size: 16px;
}
.page-style {
  background: #474646;
  border-radius: 6px;
  letter-spacing: 1px;
  padding: 0px 5px;
}
</style>
