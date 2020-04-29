<template>
  <div class="wrapper">
    <div class="tips">
      <h2>客房推荐</h2>
      <div>旅行是遇见不同的风光、人群、事物，也是在不同经历的碰撞和交织中让人们的生活和生命更加丰富</div>
    </div>
    <!-- <div class="line-first">
      <div class="img-wrapper">
        <img
          class="img"
          src="@/assets/img/expensive.png"
          alt=""
        >
      </div>
      <div class="explain">
        <h2 class="explain-name">
          总统套房
        </h2>
        <div class="explain-price">
          优惠价：<span class="price"><b>3799元</b></span>
        </div>
      </div>
    </div>
    <div class="line-sec">
      <div class="small-img-wrapper">
        <img
          class="img"
          src="@/assets/img/single.png"
          alt=""
        >
      </div>
      <div class="explain">
        <h2 class="explain-name">
          单人房
        </h2>
        <div class="explain-price">
          价格：<span class="price"><b>100元</b></span>
        </div>
      </div>
      <div class="small-img-wrapper">
        <img
          class="img"
          src="@/assets/img/double.png"
          alt=""
        >
      </div>
      <div class="explain">
        <h2 class="explain-name">
          双人房
        </h2>
        <div class="explain-price">
          价格：<span class="price"><b>200元</b></span>
        </div>
      </div>
    </div> -->
    <el-row>
      <el-col
        :span="6"
        v-for="(o, index) in data"
        :key="index"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <img
            :src="o.src"
            class="image"
          >
          <div style="padding: 14px;">
            <span>总统套房</span>
            <div class="bottom clearfix">
              <time class="time">3799</time>
              <el-button
                type="text"
                class="button"
              >操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Expensive from "@/assets/img/expensive.png";
import Single from "@/assets/img/single.png";
import Double from "@/assets/img/double.png";
export default {
  data() {
    return {
      currentDate: new Date(),
      data: [{
        src: Expensive
      }, {
        src: Single
      }, {
        src: Double
      }]
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 30px;
  width: 100%;
}

.tips {
  text-align: center;
  margin-bottom: 50px;
}

.line-first {
  width: 100%;
  display: flex;
  padding-left: 350px;
  margin-bottom: 40px;
}

.img-wrapper {
  width: 550px;
  height: 300px;
  flex: 0 0 600px;
}

.img {
  width: 100%;
  height: 100%;
}

.explain {
  flex: 0 0 300px;
  position: relative;
}

.explain-name,
.explain-price {
  position: absolute;
  left: 40px;
}

.explain-name {
  bottom: 80px;
}

.explain-price {
  bottom: 40px;
}

.price {
  color: #f10215;
  font-size: 24px;
}

.small-img-wrapper {
  width: 400px;
  height: 240px;
}

.line-sec {
  width: 100%;
  display: flex;
  padding-left: 100px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 235px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
