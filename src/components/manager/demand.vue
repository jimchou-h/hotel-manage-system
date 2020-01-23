<template>
  <div class="wrapper">
    <div class="title">
      顾客需求列表
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="demandTableData" :tableTitle="demandTableTitle" :needList="needList"></ele-table>
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
        needList: {
          situation: true
        },
        demandQuery: {
          page: 1,
          size: 10,
          manager: true
        },
        demandTableTitle: [{
            th: "房间号",
            td: "number"
          },
          {
            th: "顾客联系方式",
            td: "tel"
          },
          {
            th: "顾客需求",
            td: "demand"
          },
          {
            th: "顾客添加需求时间",
            td: "updateTime"
          },
          {
            th: "处理人",
            td: "dealer"
          },
          {
            th: "处理时间",
            td: "dealTime"
          }
        ],
        demandTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      handlePageChange(data) {
        if (data[0] == "size" && this.demandQuery.size !== data[1]) {
          this.demandQuery.page = 1;
          this.demandQuery.size = data[1];
          this.__getDemandList();
        } else if (data[0] == "page" && this.demandQuery.page !== data[1]) {
          this.demandQuery.page = data[1];
          this.__getDemandList();
        }
      },
      __initECharts(finish, unfinish) {
        let option = {
          title: {
            text: "顾客需求完成无法完成对比",
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
            data: ["顾客需求已完成", "顾客需求无法完成"],
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
                name: "顾客需求已完成",
                value: finish
              }, {
                name: "顾客需求无法完成",
                value: unfinish
              }]
            }
          ]
        };
        var pieChart = echarts.init(this.$refs["pie"]);
        pieChart.setOption(option);
      },
      __getDemandList() {
        this.$Service.getDemandList(this.demandQuery).then(res => {
          if (res.code == 1) {
            this.demandTableData = res.data.rows
            this.pagination.total = res.data.total;
            this.pagination.page = res.data.page;
            this.pagination.size = res.data.size;
            this.__initECharts(res.data.finish, res.data.unfinish);
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },
    mounted() {
      this.__getDemandList();
    }
  }
</script>

<style scoped>
  >>>.el-form--inline .el-form-item__label {
    width: 100px !important;
  }

  >>>.el-form-item__content .el-input__inner {
    width: 220px !important;
  }

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
  }

  .demand-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
