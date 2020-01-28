<template>
  <div class="wrapper">
    <div class="room-add">
      <el-button type="primary" @click="handleAddRoom()">添加客房</el-button>
      <div class="search-wrapper">
        <el-input v-model="roomQuery.q" size="mini" placeholder="输入房间号搜索" />
      </div>
    </div>
    <div class="table-wrapper">
      <ele-table :tableData="roomTableData" :tableTitle="roomTableTitle" :needList="needList" :operate="operate"
        @delete="handleRoomDelete($event)" @edit="handleRoomEdit($event)"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <el-dialog :close-on-click-modal="false" :title="roomAddQuery.id ? '编辑客房信息' : '添加客房信息'" :visible.sync="roomAdd"
      width="45%" :before-close="handleRoomDialogClose">
      <el-form :inline="true" :rules="rules" :model="roomAddQuery" ref="roomAddQuery">
        <el-form-item label="房间号" prop="number">
          <el-input v-model="roomAddQuery.number"></el-input>
        </el-form-item>
        <el-form-item label="客房价格" prop="price">
          <el-input v-model="roomAddQuery.price"></el-input>
        </el-form-item>
        <el-form-item label="房间类型" prop="type">
          <el-select v-model="roomAddQuery.type">
            <el-option label="单人房" value="单人房">
            </el-option>
            <el-option label="双人房" value="双人房">
            </el-option>
            <el-option label="总统套房" value="总统套房">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" prop="isRent">
          <el-select v-model="roomAddQuery.isRent">
            <el-option label="是" :value="1">
            </el-option>
            <el-option label="否" :value="2">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleRoomDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleRoomFormSubmit()">确 定</el-button>
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
          isRent: true
        },
        positions: [{
          label: "前台",
          value: "front"
        }, {
          label: "酒店清洁人员",
          value: "cleaner"
        }, {
          label: "后勤人员",
          value: "logistics"
        }, {
          label: "酒店经理",
          value: "manager"
        }],
        roomQuery: {
          page: 1,
          size: 10,
          q: ""
        },
        roomTableTitle: [{
            th: "房间号",
            td: "number"
          },
          {
            th: "房间类型",
            td: "type"
          },
          {
            th: "客房价格",
            td: "price"
          }
        ],
        roomTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        },
        roomAdd: false,
        roomAddQuery: {
          number: "",
          price: "",
          isRent: 1,
          type: "单人房"
        },

        delrow: "",

        // 节流
        loading: false,

        rules: {
          number: {
            required: true,
            message: "房间号不能为空",
            trigger: "blur"
          },
          price: {
            required: true,
            message: "客房价格不能为空",
            trigger: "blur"
          },
          type: {
            required: true,
            message: "",
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      handlePageChange(data) {
        if (data[0] == "size" && this.roomQuery.size !== data[1]) {
          this.roomQuery.page = 1;
          this.roomQuery.size = data[1];
          this.__getRoomList();
        } else if (data[0] == "page" && this.roomQuery.page !== data[1]) {
          this.roomQuery.page = data[1];
          this.__getRoomList();
        }
      },
      handleDel(type) {
        if (type) {
          this.$Service.delRoom({
            id: this.delrow.id
          }).then(res => {
            if (res.code == 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.$refs.dialogDelete.dialogOpen = false;
              this.delrow = "";
              if (this.roomTableData.length == 1 && this.roomQuery.page != 1) {
                this.roomQuery.page--;
              }
              this.__getRoomList();
            } else {
              this.$message.error('删除失败');
            }
          })
        } else {
          this.delrow = "";
        }
      },
      handleRoomDelete(row) {
        this.delrow = row;
        this.$refs.dialogDelete.dialogOpen = true;
      },
      handleRoomEdit(row) {
        Object.assign(this.roomAddQuery, row);
        this.roomAdd = true;
      },
      handleAddRoom() {
        this.roomAdd = true;
      },
      handleRoomDialogClose() {
        this.roomAdd = false;
        delete this.roomAddQuery.id;
        Object.assign(this.$data.roomAddQuery, this.$options.data().roomAddQuery);
      },
      handleRoomFormSubmit() {
        this.$refs["roomAddQuery"].validate(valid => {
          if (valid) {
            if (this.roomAddQuery.id) {
              this.$Service.editRoom(this.roomAddQuery).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '修改客房信息成功',
                    type: 'success'
                  });
                  this.roomAdd = false;
                  delete this.roomAddQuery.id;
                  Object.assign(this.$data.roomAddQuery, this.$options.data().roomAddQuery);
                  this.__getRoomList();
                } else {
                  this.$message.error('修改客房信息失败');
                }
              });
            } else {
              this.$Service.checkRoomRepeat({
                number: this.roomAddQuery.number
              }).then(res => {
                if (res.code == 1) {
                  if (res.data) {
                    this.$Service.addRoom(this.roomAddQuery).then(res => {
                      if (res.code == 1) {
                        this.$message({
                          message: '添加客房信息成功',
                          type: 'success'
                        });
                        this.roomAdd = false;
                        Object.assign(this.$data.roomAddQuery, this.$options.data().roomAddQuery);
                        this.__getRoomList();
                      } else {
                        this.$message.error('添加客房信息失败');
                      }
                    });
                  } else {
                    this.$message.error('客房号已存在');
                  }
                }
              })

            }
          }
        });
      },
      __getRoomList() {
        this.$Service.getRoomList(this.roomQuery).then(res => {
          if (res.code == 1) {
            this.roomTableData = res.data.rows
            this.pagination.total = res.data.total;
            this.pagination.page = res.data.page;
            this.pagination.size = res.data.size;
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },
    watch: {
      'roomQuery.q': {
        handler: function() {
          if (this.loading) {
            return;
          }
          var _that = this;
          this.loading = true;
          setTimeout(function() {
            _that.__getRoomList();
            _that.loading = false;
          }, 500)
        },
      }
    },
    mounted() {
      this.__getRoomList();
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

  .search-wrapper {
    float: right;
  }

  >>>.search-wrapper .el-input__inner {
    width: 220px !important;
  }

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
  }

  .room-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
