<template>
  <div class="form-wrapper">
    <div class="input-wrapper">
      <div class="input-item">
        <el-input v-model="input1" placeholder="请输入开始位置"></el-input>
      </div>
      <div class="input-item">
        <el-input v-model="input2" placeholder="请输入结束位置"></el-input>
      </div>
      <div class="input-item">
        <el-input v-model="input3" placeholder="请输入市级"></el-input>
      </div>
      <div class="button-item">
        <el-button type="primary" @click="handleSearch()">查询</el-button>
      </div>
    </div>
    <baidu-map class="bm-view" center="汕头">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-local-search keyword="景点" :auto-viewport="true" location="汕头"></bm-local-search>
      <bm-transit :start="actual1" :end="actual2" :auto-viewport="true" :location="actual3"></bm-transit>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      actual1: "",
      actual2: "",
      actual3: "",
    }
  },
  methods: {
    handleSearch() {
      this.actual1 = this.input1;
      this.actual2 = this.input2;
      this.actual3 = this.input3;
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  margin: 40px;
}

.input-wrapper {
  width: 700px;
  display: flex;
}

.input-item {
  flex: 1;
}

.input-item+.input-item {
  margin: 0 0 10px 10px;
}

.button-item {
  margin: 0 0 0 10px;
  flex: 0 0 80px;
}

.bm-view {
  width: 100%;
  height: 550px;
}
</style>
