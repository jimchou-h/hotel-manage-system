<template>
  <div class="wrapper">
    <div class="title">
      账单支出
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="paymentTableData" :tableTitle="paymentTableTitle"></ele-table>
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
        paymentQuery: {
          page: 1,
          size: 10,
          pay: true
        },
        paymentTableTitle: [{
            th: "购入物品名",
            td: "name"
          },
          {
            th: "总价格",
            td: "totalPrice"
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
            let rows = res.data.rows
            for (let i = 0, j = rows.length; i < j; i++) {
              rows[i].totalPrice = rows[i].price * rows[i].number;
            }
            this.paymentTableData = rows
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
