<template>
  <div class="wrapper">
    <div class="title">
      客房收入
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="moneyTableData" :tableTitle="moneyTableTitle"></ele-table>
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
        moneyQuery: {
          page: 1,
          size: 10,
          income: true
        },
        moneyTableTitle: [{
            th: "房间号",
            td: "number"
          },
          {
            th: "总价格",
            td: "totalPrice"
          },
          {
            th: "预定时间",
            td: "bookTime"
          },
          {
            th: "入住时间",
            td: "liveTime"
          },
          {
            th: "顾客姓名",
            td: "customerName"
          },
          {
            th: "顾客身份证号",
            td: "customerIdentity"
          },
          {
            th: "顾客联系方式",
            td: "tel"
          },
          {
            th: "押金",
            td: "deposit"
          },
          {
            th: "预计退房时间",
            td: "preLiveTime"
          },
          {
            th: "退房时间",
            td: "leaveTime"
          },
          {
            th: "收款人",
            td: "setPayName"
          }
        ],
        moneyTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      handleSetMoneyIsPay() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('未选中任何记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].isPay == 0) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选中的记录都已支付，请重新选择');
          return;
        }
        this.$Service.setMoneyIsPay({
          ids: ids
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '设置已支付成功',
              type: 'success'
            });
            this.__getMoneyList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handlePageChange(data) {
        if (data[0] == "size" && this.moneyQuery.size !== data[1]) {
          this.moneyQuery.page = 1;
          this.moneyQuery.size = data[1];
          this.__getMoneyList();
        } else if (data[0] == "page" && this.moneyQuery.page !== data[1]) {
          this.moneyQuery.page = data[1];
          this.__getMoneyList();
        }
      },
      __getMoneyList() {
        this.$Service.getMoneyList(this.moneyQuery).then(res => {
          if (res.code == 1) {
            this.moneyTableData = res.data.rows
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
      this.__getMoneyList();
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

  .money-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
