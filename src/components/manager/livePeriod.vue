<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <div class="date-wrapper">
        <el-date-picker
          v-model="preDate"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerBeginDateAfter"
        ></el-date-picker>
        <el-date-picker
          v-model="currentDate"
          type="date"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerBeginDateBefore"
        ></el-date-picker>
      </div>
      <div><span v-if="this.preDate && this.currentDate">从 {{ this.preDate }} 到 {{ this.currentDate }}</span> 该时期入住总人数： <span style="color: red">{{ totalPeople }}</span></div>
    </div>
    <div
      ref="pie"
      style="width: 100%; height: 400px;"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      totalPeople: 0,
      preDate: "",
      currentDate: "",
      pickerBeginDateAfter: {
        disabledDate: time => {
          if (!this.currentDate) {
            var _end = new Date(Date.now());
          } else {
            var _end = new Date(this.currentDate);
          }
          return time.getTime() > _end.getTime();
        }
      },
      pickerBeginDateBefore: {
        disabledDate: time => {
          let _start = new Date(this.preDate);
          let _end = new Date(Date.now());
          return time.getTime() < _start.getTime() || time.getTime() >= _end.getTime();
        }
      }
    };
  },
  methods: {
    __initECharts(data) {
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: data.yData,
            type: "line",
            areaStyle: {
              color: "blue"
            },
            itemStyle: {
              normal: {
                color: "blue",
                lineStyle: {
                  color: "blue"
                }
              }
            }
          }
        ]
      };
      var pieChart = echarts.init(this.$refs["pie"]);
      pieChart.setOption(option);
    },
    __getData() {
      this.$Service
        .getDayPeriod({
          preDate: this.preDate,
          currentDate: this.currentDate
        })
        .then(res => {
          if (res.code == 1) {
            this.totalPeople = res.data.xData.length;
            this.__initECharts(res.data);
          }
        });
    },
    async __dateInit() {
      let d = new Date();
      this.currentDate = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '')  + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
      this.preDate = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '')  + (d.getMonth() + 1) + '-01 00:00:00';
      await this.__getData();
      this.__setWatch();
    },
    __setWatch() {
      this.$watch('preDate', this.__getData);
      this.$watch('currentDate', this.__currentDatehandler)
    },
    __currentDatehandler() {
      if (!this.preDate && this.currentDate) {
        this.$message.error("请先输入第一个日期");
        this.currentDate = "";
        return;
      }
      this.__getData();
    }
  },
  mounted() {
    this.__dateInit();
  }
};
</script>

<style scoped>
.wrapper {
  margin: 36px;
  margin-bottom: 0;
  width: auto;
}

.search-wrapper {
  margin-bottom: 20px;
}

.search-wrapper .date-wrapper {
  float: right;
  margin-right: 50px;
}

>>> .el-date-editor + .el-date-editor {
  margin-left: 20px;
}
</style>