<template>
  <div>
    <div class="table-wrapper">
      <ele-table v-if="tableData" ref="table" :tableData="tableData" :tableTitle="tableTitle"></ele-table>
    </div>
    <div ref="pie" style="width: 96%; height: 400px;"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {
        tableTitle: [{
          th: "总收入/元",
          td: "income"
        }, {
          th: "总支出/元",
          td: "pay"
        }, {
          th: "净收入/元",
          td: "earn"
        }],
        tableData: ""
      }
    },
    methods: {
      __initECharts(income, pay) {
        let option = {
          title: {
            text: "总收入支出对比",
            x: "center",
            textStyle: {
              fontSize: "24"
            },
            top: "6%"
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            x: "center",
            y: "top",
            top: "20%",
            orient: "horizontal",
            data: ["总收入", "总支出"],
            icon: "circle",
            itemStyle: {
              fontSize: "14"
            }
          },
          series: [
            {
              type: "pie",
              center: ["50%", "65%"],
              radius: ["50%", "60%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                  formatter: '{b}\n\n {c}'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "20",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                name: "总收入",
                value: income
              }, {
                name: "总支出",
                value: pay
              }]
            }
          ]
        };
        var pieChart = echarts.init(this.$refs["pie"]);
        pieChart.setOption(option);
      },
      __getData() {
        this.$Service.getReportOneData().then(res => {
          if (res.code == 1) {
            this.tableData = [{
              income: res.data.income,
              pay: res.data.pay,
              earn: res.data.income - res.data.pay
            }]
            this.__initECharts(res.data.income, res.data.pay);
          }
        })
      }
    },
    mounted() {
      this.__getData();
    }
  }
</script>

<style scoped>
  .table-wrapper {
    margin: 36px 18px 18px 18px;
  }
</style>
