<template>
  <div class="wrapper">
    <div class="cleaner-add">
      <el-button
        type="primary"
        @click="handleSetRoomClean()"
      >设置为已清理</el-button>
      <el-button
        type="primary"
        @click="handleSetRoomUnclean()"
      >设置为未清理</el-button>
      <div class="search-wrapper">
        <el-select
          v-model="cleanerQuery.q"
          placeholder="清理状态筛选"
        >
          <el-option
            label="全部"
            value
          >
          </el-option>
          <el-option
            label="已清理"
            value="1"
          >
          </el-option>
          <el-option
            label="未清理"
            value="0"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-wrapper">
      <ele-table
        ref="table"
        :tableData="cleanerTableData"
        :tableTitle="cleanerTableTitle"
        @receive="handleReceiveTask($event)"
        :needList="needList"
        :operate="operate"
      ></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination
        v-if="pagination.total"
        :pagination="pagination"
        @change="handlePageChange(arguments)"
      ></pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      needList: {
        isClean: true,
        isLive: true,
        isBook: true,
        selection: true
      },
      cleanerQuery: {
        page: 1,
        size: 10,
        q: ""
      },
      cleanerTableTitle: [
        {
          th: "房间号",
          td: "number"
        },
        {
          th: "清理人",
          td: "cleaner"
        },
        {
          th: "清理时间",
          td: "cleantime"
        }
      ],
      cleanerTableData: [],
      pagination: {
        total: "",
        page: "",
        size: ""
      },
      operate: {
        receive: true
      },
      loading: false
    };
  },
  methods: {
    handleReceiveTask(row) {
      this.$Service
        .receiveTask({
          id: row.id,
          name: this.$store.state.personal.name
        })
        .then(res => {
          if (res.code == 1) {
            this.$message({
              message: "接收成功",
              type: "success"
            });
            this.__getCleanerList();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    handleSetRoomUnclean() {
      let selectList = this.$refs.table.getSelectedItem();
      if (!selectList.length) {
        this.$message.error("未选中任何客房");
        return;
      }
      let ids = [];
      for (let i = 0, j = selectList.length; i < j; i++) {
        if (selectList[i].isBook == 1 || selectList[i].isLive == 1) {
          this.$message.error("客房存在已预约和已入住状态，无法进行修改");
          return;
        }
        if (selectList[i].isClean == 1) {
          ids.push(selectList[i].id);
        }
      }
      if (!ids.length) {
        this.$message.error("无效的操作");
        return;
      }
      this.$Service
        .setRoomUnclean({
          ids: ids
        })
        .then(res => {
          if (res.code == 1) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.__getCleanerList();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    handleSetRoomClean() {
      const { name } = this.$store.state.personal;
      let selectList = this.$refs.table.getSelectedItem();
      if (!selectList.length) {
        this.$message.error("未选中任何客房");
        return;
      }
      let ids = [];
      for (let i = 0, j = selectList.length; i < j; i++) {
        if (selectList[i].isClean == 2) {
          if (selectList[i].cleaner === name) {
            ids.push(selectList[i].id);
          }
        }
      }
      if (!ids.length) {
        this.$message.error("无效的操作");
        return;
      }
      this.$Service
        .setRoomClean({
          ids: ids,
          name: this.$store.state.personal.name
        })
        .then(res => {
          if (res.code == 1) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.__getCleanerList();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    handlePageChange(data) {
      if (data[0] == "size" && this.cleanerQuery.size !== data[1]) {
        this.cleanerQuery.page = 1;
        this.cleanerQuery.size = data[1];
        this.__getCleanerList();
      } else if (data[0] == "page" && this.cleanerQuery.page !== data[1]) {
        this.cleanerQuery.page = data[1];
        this.__getCleanerList();
      }
    },
    __getCleanerList() {
      this.$Service.getCleanerList(this.cleanerQuery).then(res => {
        if (res.code == 1) {
          this.cleanerTableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.page = res.data.page;
          this.pagination.size = res.data.size;
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  watch: {
    "cleanerQuery.q": {
      handler: function() {
        if (this.loading) {
          return;
        }
        var _that = this;
        this.loading = true;
        setTimeout(function() {
          _that.__getCleanerList();
          _that.loading = false;
        }, 500);
      }
    }
  },
  mounted() {
    this.__getCleanerList();
  }
};
</script>

<style scoped>
>>> .el-form--inline .el-form-item__label {
  width: 100px !important;
}

>>> .el-form-item__content .el-input__inner {
  width: 220px !important;
}

.search-wrapper {
  float: right;
}

>>> .search-wrapper .el-input__inner {
  width: 220px !important;
}

.wrapper {
  margin: 36px;
  margin-bottom: 0;
}

.cleaner-add {
}

.table-wrapper {
  margin-top: 18px;
}

.pagination-wrapper {
  margin: 18px 0;
  margin-left: -10px;
}
</style>
