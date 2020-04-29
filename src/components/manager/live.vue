<template>
  <div class="wrapper">
    <div class="title">
      顾客入住次数统计
    </div>
    <div class="table-wrapper">
      <ele-table
        ref="table"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :operate="operate"
        @watch="handleGetCustomerDetail($event)"
      ></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination
        v-if="pagination.total"
        :pagination="pagination"
        @change="handlePageChange(arguments)"
      ></pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="查看详情"
      :visible.sync="showDetail"
      :before-close="handleRoomDialogClose"
    >
      <ele-table
        ref="table"
        :tableData="detailTableData"
        :tableTitle="detailTableTitle"
      ></ele-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetail: false,
      tableData: [],
      detailTableTitle: [
        {
          th: "顾客姓名",
          td: "customerName"
        },
        {
          th: "房间号",
          td: "number"
        },
        {
          th: "入住时间",
          td: "liveTime"
        },
        {
          th: "押金",
          td: "deposit"
        },
        {
          th: "退房时间",
          td: "leaveTime"
        },
        {
          th: "总价格",
          td: "totalPrice"
        },
      ],
      detailTableData: [],
      tableTitle: [
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
          th: "顾客入住次数",
          td: "num",
          sortable: true
        },
        {
          th: "总花费价格",
          td: "total",
          sortable: true
        }
      ],
      liveQuery: {
        page: 1,
        size: 10
      },
      pagination: {
        total: "",
        page: "",
        size: ""
      },
      operate: {
        watch: true
      }
    };
  },
  methods: {
    handleRoomDialogClose() {
      this.showDetail = false;
    },
    handleGetCustomerDetail(data) {
      this.$Service
        .getCustomerLiveDetail({
          customerIdentity: data
        })
        .then(res => {
          if (res.code == 1) {
            this.detailTableData = res.data;
            this.showDetail = true;
          } else {
            this.$message.error(res.message);
          }
        });
    },
    __getReport() {
      this.$Service.getLiveCounts(this.liveQuery).then(res => {
        if (res.code == 1) {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.page = res.data.page;
          this.pagination.size = res.data.size;
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  mounted() {
    this.__getReport();
  }
};
</script>

<style>
.wrapper {
  margin: 36px;
  margin-bottom: 0;
}

.demand-add {
}

.table-wrapper {
  margin-top: 18px;
}

.pagination-wrapper {
  margin: 18px 0;
  margin-left: -10px;
}
</style>
