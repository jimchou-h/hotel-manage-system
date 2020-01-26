<template>
  <div class="wrapper">
    <div class="title">
      顾客入住次数统计(由多到少排序)
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="tableData" :tableTitle="tableTitle"></ele-table>
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
        tableData: [],
        tableTitle: [{
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
            th: "顾客入住次数",
            td: "num"
          }
        ],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      __getReport() {
        this.$Service.getLiveCounts().then(res => {
          if (res.code == 1) {
            this.tableData = res.data
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
      this.__getReport();
    }
  }
</script>

<style>
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
