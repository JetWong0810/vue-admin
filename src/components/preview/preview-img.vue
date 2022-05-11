<template>
  <div class="img-container">
    <div class="main">
      <el-image class="previewImg" fit="contain" :src="fileUrl" v-bind:style="{ width: containerWidth + '%', height: 'calc(' + containerHeight + 'vh)' }"></el-image>
    </div>
    <ul class="footers">
      <li :class="{ select: idx == 0 }" @touchstart="idx = 0" @touchend="idx = -1" @click="scaleD">
        <p class="more-p">+</p>
      </li>
      <li :class="{ select: idx == 1 }" @touchstart="idx = 1" @touchend="idx = -1" @click="scaleX">
        <p class="small-p">-</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '',
      containerWidth: 40,
      containerHeight: 60,
      fileUrl: '',
      idx: -1
    }
  },
  methods: {
    // 放大
    scaleD() {
      this.containerWidth += 3
      this.containerHeight += 3
    },

    // 缩小
    scaleX() {
      if (this.containerWidth == 40) {
        return
      }
      this.containerWidth -= 3
      this.containerHeight -= 3
    }
  },
  watch: {
    fileUrl(val) {
      this.containerWidth = 40
      this.containerHeight = 60
      this.fileUrl = val
    }
  }
}
</script>
<style scoped>
.img-container {
  width: 100%;
}
.main {
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.footers {
  position: fixed;
  bottom: 50px;
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
</style>
