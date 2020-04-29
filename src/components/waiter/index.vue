<template>
  <div class="wrapper">
    <div class="waiter-add">
      <el-button type="primary" @click="handleSetDemandFinish()">设置为已完成</el-button>
      <el-button type="primary" @click="handleSetDemandUnfinish()">设置为无法完成</el-button>
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="waiterTableData" :tableTitle="waiterTableTitle" :needList="needList"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        needList: {
          situation: true,
          selection: true
        },
        waiterQuery: {
          page: 1,
          size: 10
        },
        waiterTableTitle: [{
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
        waiterTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      handleSetDemandUnfinish() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('请先选择一条记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].situation == 0) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选择的不存在正在处理中的顾客需求');
          return;
        }
        this.$Service.setDemandUnfinish({
          ids: ids,
          name: this.$store.state.personal.name
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.__getDemandList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handleSetDemandFinish() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('请先选择一条记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].situation == 0) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选择的不存在正在处理中的顾客需求');
          return;
        }
        this.$Service.setDemandFinish({
          ids: ids,
          name: this.$store.state.personal.loginName
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.__getDemandList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handlePageChange(data) {
        if (data[0] == "size" && this.waiterQuery.size !== data[1]) {
          this.waiterQuery.page = 1;
          this.waiterQuery.size = data[1];
          this.__getDemandList();
        } else if (data[0] == "page" && this.waiterQuery.page !== data[1]) {
          this.waiterQuery.page = data[1];
          this.__getDemandList();
        }
      },
      __getDemandList() {
        this.$Service.getDemandList(this.waiterQuery).then(res => {
          if (res.code == 1) {
            this.waiterTableData = res.data.rows
            this.pagination.total = res.data.total;
            this.pagination.page = res.data.page;
            this.pagination.size = res.data.size;
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

  .waiter-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
