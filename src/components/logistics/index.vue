<template>
  <div class="wrapper">
    <div class="logistics-add">
      <el-button type="primary" @click="handleAddLogisticsPayment()">添加账单</el-button>
      <el-button type="primary" @click="handleSetPaymentBuy()">设置为已采购</el-button>
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="logisticsTableData" :tableTitle="logisticsTableTitle" :operate="operate" :needList="needList"
        @delete="handleLogisticsDelete($event)" @edit="handleLogisticsEdit($event)"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <el-dialog :close-on-click-modal="false" :title="logisticsAddQuery.id ? '编辑账单信息' : '添加账单信息'" :visible.sync="logisticsAdd" width="45%"
      :before-close="handleLogisticsDialogClose">
      <el-form :inline="true" :rules="rules" :model="logisticsAddQuery" ref="logisticsAddQuery">
        <el-form-item label="购入物品名" prop="name">
          <el-input v-model="logisticsAddQuery.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="logisticsAddQuery.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input type="number" v-model="logisticsAddQuery.number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="logisticsAddQuery.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleLogisticsDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleLogisticsFormSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <dialogDelete ref="dialogDelete" @dialogClose="handleDel($event)">
      <span style>确认要删除吗？</span>
    </dialogDelete>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        operate: {
          edit: true,
          delete: true
        },
        needList: {
          isAllow: true,
          isBuy: true,
          selection: true
        },
        logisticsQuery: {
          page: 1,
          size: 10
        },
        logisticsTableTitle: [{
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
        logisticsTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        },
        logisticsAdd: false,
        logisticsAddQuery: {
          name: "",
          price: "",
          number: 0,
          description: ""
        },

        delrow: "",

        rules: {
          name: {
            required: true,
            message: "购入物品名不能为空",
            trigger: "blur"
          },
          price: {
            required: true,
            message: "价格不能为空",
            trigger: "blur"
          },
          number: {
            required: true,
            message: "数量不能为空",
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      handleSetPaymentBuy() {
        let selectList = this.$refs.table.getSelectedItem();
        if (!selectList.length) {
          this.$message.error('请先选择至少一条记录');
          return;
        }
        let ids = []
        for (let i = 0, j = selectList.length; i < j; i++) {
          if (selectList[i].isAllow == 1 && selectList[i].isBuy == 0) {
            ids.push(selectList[i].id);
          }
        }
        if (!ids.length) {
          this.$message.error('选中的记录均无效，请重新再试');
          return;
        }
        this.$Service.setPaymentBuy({
          ids: ids
        }).then(res => {
          if (res.code == 1) {
            this.$message({
              message: '设置已采购成功',
              type: 'success'
            });
            this.__getLogisticsList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      handlePageChange(data) {
        if (data[0] == "size" && this.logisticsQuery.size !== data[1]) {
          this.logisticsQuery.page = 1;
          this.logisticsQuery.size = data[1];
          this.__getLogisticsList();
        } else if (data[0] == "page" && this.logisticsQuery.page !== data[1]) {
          this.logisticsQuery.page = data[1];
          this.__getLogisticsList();
        }
      },
      handleDel(type) {
        if (type) {
          this.$Service.delLogistics({
            id: this.delrow.id
          }).then(res => {
            if (res.code == 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.$refs.dialogDelete.dialogOpen = false;
              this.delrow = "";
              if (this.logisticsTableData.length == 1 && this.logisticsQuery.page != 1) {
                this.logisticsQuery.page--;
              }
              this.__getLogisticsList();
            } else {
              this.$message.error('删除失败');
            }
          })
        } else {
          this.delrow = "";
        }
      },
      handleLogisticsDelete(row) {
        if (row.isAllow == 1) {
          this.$message.error('经理已同意，无法进行删除');
          return;
        }
        this.delrow = row;
        this.$refs.dialogDelete.dialogOpen = true;
      },
      handleLogisticsEdit(row) {
        if (row.isAllow == 1) {
          this.$message.error('经理已同意，无法进行修改');
          return;
        }
        Object.assign(this.logisticsAddQuery, row);
        this.logisticsAdd = true;
      },
      handleAddLogisticsPayment() {
        this.logisticsAdd = true;
      },
      handleLogisticsDialogClose() {
        this.logisticsAdd = false;
        delete this.logisticsAddQuery.id;
        Object.assign(this.$data.logisticsAddQuery, this.$options.data().logisticsAddQuery);
      },
      handleLogisticsFormSubmit() {
        this.$refs["logisticsAddQuery"].validate(valid => {
          if (valid) {
            if (this.logisticsAddQuery.id) {
              this.$Service.editPayment(this.logisticsAddQuery).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.logisticsAdd = false;
                  delete this.logisticsAddQuery.id;
                  Object.assign(this.$data.logisticsAddQuery, this.$options.data().logisticsAddQuery);
                  this.__getLogisticsList();
                } else {
                  this.$message.error('修改账单失败');
                }
              });
            } else {
              this.$Service.addPayment(this.logisticsAddQuery).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '添加账单成功',
                    type: 'success'
                  });
                  this.logisticsAdd = false;
                  Object.assign(this.$data.logisticsAddQuery, this.$options.data().logisticsAddQuery);
                  this.__getLogisticsList();
                } else {
                  this.$message.error('添加账单失败');
                }
              });
            }
          }
        });
      },
      __getLogisticsList() {
        this.$Service.getPaymentList(this.logisticsQuery).then(res => {
          if (res.code == 1) {
            this.logisticsTableData = res.data.rows
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
      this.__getLogisticsList();
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

  .logistics-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
