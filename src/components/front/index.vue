<template>
  <div class="wrapper">
    <div class="front-add clearfix">
      <div class="search-wrapper">
        <div class="select-wrapper">
          <el-select v-model="frontQuery.type" placeholder="客房状态选择">
            <el-option label="全部" value=" ">
            </el-option>
            <el-option label="空闲中" value="free">
            </el-option>
            <el-option label="已预定" value="book">
            </el-option>
            <el-option label="已入住" value="live">
            </el-option>
          </el-select>
        </div>
        <div class="select-wrapper">
          <el-select v-model="frontQuery.roomtype" placeholder="客房类型选择">
            <el-option label="全部" value=" ">
            </el-option>
            <el-option label="单人房" value="单人房">
            </el-option>
            <el-option label="双人房" value="双人房">
            </el-option>
            <el-option label="总统套房" value="总统套房">
            </el-option>
          </el-select>
        </div>
        <div class="input-wrapper">
          <el-input v-model="frontQuery.q" size="mini" placeholder="搜索房间号" />
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <ele-table :tableData="frontTableData" :tableTitle="frontTableTitle" :operate="operate" :needList="needList"
        @book="handleBook($event)" @unbook="handleUnbook($event)" @live="handleSetLive($event)" @leave="handleSetLeave($event)"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <el-dialog :close-on-click-modal="false" title="预定房间" :visible.sync="frontAdd" width="45%" :before-close="handleFrontDialogClose">
      <el-form :inline="true" :rules="rules" :model="frontAddQuery" ref="frontAddQuery">
        <el-form-item label="预约时间" prop="bookTime">
          <el-date-picker v-model="frontAddQuery.bookTime" type="datetime" placeholder="选择预计入住时间" format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="顾客姓名" prop="customerName">
          <el-input v-model="frontAddQuery.customerName"></el-input>
        </el-form-item>
        <el-form-item label="顾客身份证号" prop="customerIdentity">
          <el-input type="number" v-model="frontAddQuery.customerIdentity"></el-input>
        </el-form-item>
        <el-form-item label="顾客联系方式" prop="tel">
          <el-input v-model="frontAddQuery.tel" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="frontAddQuery.deposit" :disabled="liveIsBook"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFrontDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleFrontFormSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="办理入住" :visible.sync="frontLive" width="45%" :before-close="handleFrontLiveDialogClose">
      <el-form :inline="true" :rules="rules" :model="frontLiveQuery" ref="frontLiveQuery">
        <el-form-item label="入住时间" prop="livetime">
          <div class="livetime">
            当前时间
          </div>
        </el-form-item>
        <el-form-item label="顾客姓名" prop="customerName">
          <el-input v-model="frontLiveQuery.customerName" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="顾客身份证号" prop="customerIdentity">
          <el-input v-model="frontLiveQuery.customerIdentity" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="顾客联系方式" prop="tel">
          <el-input v-model="frontLiveQuery.tel" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="frontLiveQuery.deposit" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="预计退房时间" prop="preLiveTime">
          <el-date-picker v-model="frontLiveQuery.preLiveTime" type="datetime" placeholder="选择预计退房时间" format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerDate">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFrontLiveDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleFrontLiveFormSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <dialogDelete ref="dialogDelete" @dialogClose="handleDel($event)">
      <span style>确认要取消订房吗？</span>
    </dialogDelete>
    <dialogDelete ref="dialogLive" @dialogClose="handleRoomLeave($event)">
      <span style>确认要退房吗？</span>
    </dialogDelete>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerDate: {
          disabledDate: time => {
            return time.getTime() < (Date.now() - 86400000);
          },
          shortcuts: [{
            text: '一天',
            onClick(picker) {
              picker.$emit('pick', new Date() + 3600 * 1000 * 24);
            }
          }, {
            text: '两天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }, {
            text: '三天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit('pick', date);
            }
          }, {
            text: '四天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 4);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        operate: {
          book: true,
          live: true
        },
        needList: {
          isBook: true,
          isRent: true,
          isClean: true,
          isLive: true
        },
        frontQuery: {
          page: 1,
          size: 10,
          type: "",
          q: "",
          roomtype: ""
        },
        frontTableTitle: [{
            th: "房间号",
            td: "number"
          },
          {
            th: "房间类型",
            td: "type"
          },
          {
            th: "价格/天",
            td: "price"
          },
          {
            th: "预约时间",
            td: "booktime"
          },
          {
            th: "入住时间",
            td: "livetime"
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
            th: "清理人",
            td: "cleaner"
          },
          {
            th: "清理时间",
            td: "cleantime"
          }
        ],
        frontTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        },
        frontAdd: false,
        frontAddQuery: {
          id: "",
          bookTime: "",
          customerName: "",
          customerIdentity: "",
          tel: "",
          deposit: ""
        },
        delrow: "",

        loading: false,

        // 办理入住
        frontLive: false,
        frontLiveQuery: {
          id: "",
          livetime: "",
          customerName: "",
          customerIdentity: "",
          preLiveTime: "",
          tel: "",
          deposit: ""
        },
        liveIsBook: false,
        leaveRow: "",


        rules: {
          bookTime: {
            required: true,
            message: "预计入住时间不能为空",
            trigger: "blur"
          },
          customerName: {
            required: true,
            message: "顾客姓名不能为空",
            trigger: "blur"
          },
          customerIdentity: {
            required: true,
            message: "顾客身份证号不能为空",
            trigger: "blur"
          },
          tel: {
            required: true,
            message: "顾客联系方式不能为空",
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      // 退房
      handleSetLeave(row) {
        this.leaveRow = row;
        this.$refs.dialogLive.dialogOpen = true;
      },
      handleRoomLeave(type) {
        if (type) {
          let leaveTime = new Date().getTime()
          let time_diff = leaveTime - new Date(this.leaveRow.livetime).getTime();
          let days = Math.ceil(time_diff / (24 * 3600 * 1000));
          if (days < 1) {
            this.$message.error('时间计算有误');
            return;
          }
          let d = new Date(leaveTime);
          this.$Service.leaveFront({
            id: this.leaveRow.id
          }).then(res => {
            if (res.code == 1) {
              this.$Service.saveRoomRecord({
                number: this.leaveRow.number,
                totalPrice: days * this.leaveRow.price,
                bookTime: this.leaveRow.booktime,
                liveTime: this.leaveRow.livetime,
                customerName: this.leaveRow.customerName,
                customerIdentity: this.leaveRow.customerIdentity,
                preLiveTime: this.leaveRow.preLiveTime,
                tel: this.leaveRow.tel,
                deposit: this.leaveRow.deposit,
                leaveTime: d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '')  + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()
              }).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '退房成功，请到收银管理查看',
                    type: 'success'
                  });
                  this.$refs.dialogLive.dialogOpen = false;
                  this.leaveRow = "";
                  this.__getFrontList();
                }
              })

            } else {
              this.$message.error('退房失败');
            }
          })
        } else {
          this.leaveRow = "";
        }
      },
      // 办理入住
      handleSetLive(row) {
        this.frontLiveQuery.id = row.id;
        if (row.isBook) {
          this.frontLiveQuery.customerName = row.customerName;
          this.frontLiveQuery.customerIdentity = row.customerIdentity;
          this.frontLiveQuery.tel = row.tel;
          this.frontLiveQuery.deposit = row.deposit;
          this.liveIsBook = true;
        }
        this.frontLive = true;
      },
      handleFrontLiveDialogClose() {
        this.frontLive = false;
        this.liveIsBook = false;
        Object.assign(this.$data.frontLiveQuery, this.$options.data().frontLiveQuery);
      },
      // 提交入住表单
      handleFrontLiveFormSubmit() {
        let d = new Date();
        this.frontLiveQuery.livetime = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '')  + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
        this.$refs["frontLiveQuery"].validate(valid => {
          if (valid) {
            this.$Service.liveFront(this.frontLiveQuery).then(res => {
              if (res.code == 1) {
                this.$message({
                  message: '登记入住客房成功',
                  type: 'success'
                });
                this.handleFrontLiveDialogClose();
                this.__getFrontList();
              } else {
                this.$message.error('登记入住客房失败');
              }
            });
          }
        });
      },
      handlePageChange(data) {
        if (data[0] == "size" && this.frontQuery.size !== data[1]) {
          this.frontQuery.page = 1;
          this.frontQuery.size = data[1];
          this.__getFrontList();
        } else if (data[0] == "page" && this.frontQuery.page !== data[1]) {
          this.frontQuery.page = data[1];
          this.__getFrontList();
        }
      },
      // 取消预订
      handleUnbook(row) {
        this.delrow = row;
        this.$refs.dialogDelete.dialogOpen = true;
      },
      handleDel(type) {
        if (type) {
          this.$Service.unbookRoom({
            id: this.delrow.id
          }).then(res => {
            if (res.code == 1) {
              this.$message({
                message: '取消客房预定成功',
                type: 'success'
              });
              this.$refs.dialogDelete.dialogOpen = false;
              this.delrow = "";
              this.__getFrontList();
            } else {
              this.$message.error('取消客房预定失败');
            }
          })
        } else {
          this.delrow = "";
        }
      },
      // 预定事件，打开预定对话框
      handleBook(row) {
        this.frontAddQuery.id = row.id;
        this.frontAdd = true;
      },
      handleAddFront() {
        this.frontAdd = true;
      },
      handleFrontDialogClose() {
        this.frontAdd = false;
        Object.assign(this.$data.frontAddQuery, this.$options.data().frontAddQuery);
      },
      handleFrontFormSubmit() {
        this.$refs["frontAddQuery"].validate(valid => {
          if (valid) {
            this.$Service.bookFront(this.frontAddQuery).then(res => {
              if (res.code == 1) {
                this.$message({
                  message: '预定客房成功',
                  type: 'success'
                });
                this.handleFrontDialogClose();
                this.__getFrontList();
              } else {
                this.$message.error('预定客房失败');
              }
            });
          }
        });
      },
      __getFrontList() {
        this.$Service.getFrontList(this.frontQuery).then(res => {
          if (res.code == 1) {
            this.frontTableData = res.data.rows
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
      'frontQuery.type': {
        handler: function() {
          if (this.loading) {
            return;
          }
          var _that = this;
          this.loading = true;
          setTimeout(function() {
            _that.__getFrontList();
            _that.loading = false;
          }, 500)
        },
      },
      'frontQuery.q': {
        handler: function() {
          if (this.loading) {
            return;
          }
          var _that = this;
          this.loading = true;
          setTimeout(function() {
            _that.__getFrontList();
            _that.loading = false;
          }, 500)
        },
      },
      'frontQuery.roomtype': {
        handler: function() {
          if (this.loading) {
            return;
          }
          var _that = this;
          this.loading = true;
          setTimeout(function() {
            _that.__getFrontList();
            _that.loading = false;
          }, 500)
        },
      }
    },
    mounted() {
      this.__getFrontList();
    }
  }
</script>

<style scoped>
  >>>.el-form--inline .el-form-item__label {
    width: 120px !important;
  }

  >>>.el-form-item__content .el-input__inner {
    width: 220px !important;
  }

  .livetime {
    width: 220px;
  }

  .search-wrapper {
    float: right;
  }

  .search-wrapper .input-wrapper {
    float: right;
    margin-right: 10px;
  }

  .search-wrapper .select-wrapper {
    float: right;
  }

  .search-wrapper .select-wrapper+.select-wrapper {
    float: right;
    margin-right: 10px;
  }

  >>>.search-wrapper .el-input__inner {
    width: 220px !important;
  }

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
    width: auto;
  }

  .front-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
