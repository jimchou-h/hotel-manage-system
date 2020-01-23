<template>
  <div class="wrapper">
    <div class="payment-add">
      <el-button type="primary" @click="handleSetPaymentAllow()">设置为已同意</el-button>
      <el-button type="primary" @click="handleSetPaymentDisallow()">设置为不同意</el-button>
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="paymentTableData" :tableTitle="paymentTableTitle" :needList="needList"></ele-table>
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
          selection: true,
          isAllow: true,
          isBuy: true,
        },
        paymentQuery: {
          page: 1,
          size: 10
        },
        paymentTableTitle: [{
            th: "购入物品名",
            td: "name"
          },
          {
            th: "价格",
            td: "price"
          },
          {
            th: "数量",
            td: "number"
          },
          {
            th: "备注",
            td: "description"
          }
        ],
        paymentTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      handleSetPaymentDisallow() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('请先选择至少一条记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].isAllow != -1) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选中的记录均已不同意，请重新再试');
          return;
        }
        this.$Service.setPaymentDisallow({
          ids: ids
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '设置不同意成功',
              type: 'success'
            });
            this.__getPaymentList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handleSetPaymentAllow() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('请先选择至少一条记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].isAllow != 1) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选中的记录均已同意，请重新再试');
          return;
        }
        this.$Service.setPaymentAllow({
          ids: ids
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '设置已同意成功',
              type: 'success'
            });
            this.__getPaymentList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handlePageChange(data) {
        if (data[0] == "size" && this.paymentQuery.size !== data[1]) {
          this.paymentQuery.page = 1;
          this.paymentQuery.size = data[1];
          this.__getPaymentList();
        } else if (data[0] == "page" && this.paymentQuery.page !== data[1]) {
          this.paymentQuery.page = data[1];
          this.__getPaymentList();
        }
      },
      __getPaymentList() {
        this.$Service.getPaymentList(this.paymentQuery).then(res => {
          if (res.code == 1) {
            this.paymentTableData = res.data.rows
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
      this.__getPaymentList();
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

  .payment-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
