<template>
  <div class="wrapper">
    <div class="title">
      顾客意见列表
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="situationTableData" :tableTitle="situationTableTitle"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <div ref="pie" style="width: 96%; height: 400px;"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {
        situationQuery: {
          page: 1,
          size: 10,
        },
        situationTableTitle: [{
            th: "房间号",
            td: "number"
          },
          {
            th: "评分",
            td: "star"
          },
          {
            th: "建议",
            td: "situation"
          }
        ],
        situationTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      handlePageChange(data) {
        if (data[0] == "size" && this.situationQuery.size !== data[1]) {
          this.situationQuery.page = 1;
          this.situationQuery.size = data[1];
          this.__getSituationList();
        } else if (data[0] == "page" && this.situationQuery.page !== data[1]) {
          this.situationQuery.page = data[1];
          this.__getSituationList();
        }
      },
      __initECharts(satisify, unsatisify) {
        let option = {
          title: {
            text: "顾客意见统计",
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
            data: ["顾客满意数（4星或4星以上）", "顾客不满意数（4星以下）"],
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
                    fontSize: "14",
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
                name: "顾客满意数（4星或4星以上）",
                value: satisify
              }, {
                name: "顾客不满意数（4星以下）",
                value: unsatisify
              }]
            }
          ]
        };
        var pieChart = echarts.init(this.$refs["pie"]);
        pieChart.setOption(option);
      },
      __getSituationList() {
        this.$Service.getSituationList(this.situationQuery).then(res => {
          if (res.code == 1) {
            this.situationTableData = res.data.rows
            this.pagination.total = res.data.total;
            this.pagination.page = res.data.page;
            this.pagination.size = res.data.size;
            this.__initECharts(res.data.satisify, res.data.unsatisify);
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },
    mounted() {
      this.__getSituationList();
    }
  }
</script>

<style scoped>

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
  }

  .situation-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
