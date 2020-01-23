<template>
  <div class="wrapper">
    <div class="employee-add">
      <el-button type="primary" @click="handleAddEmployee()">添加员工</el-button>
      <div class="search-wrapper">
        <el-input v-model="employeeQuery.q" size="mini" placeholder="输入搜索字段" />
      </div>
    </div>
    <div class="table-wrapper">
      <ele-table :tableData="employeeTableData" :tableTitle="employeeTableTitle" :operate="operate" :needList="needList"
        @delete="handleEmployeeDelete($event)" @edit="handleEmployeeEdit($event)"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <el-dialog :close-on-click-modal="false" :title="employeeAddQuery.id ? '编辑员工信息' : '添加员工信息'" :visible.sync="employeeAdd" width="45%" :before-close="handleEmployeeDialogClose">
      <el-form :inline="true" :rules="rules" :model="employeeAddQuery" ref="employeeAddQuery">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employeeAddQuery.name"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="employeeAddQuery.loginName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="employeeAddQuery.sex" placeholder="请选择性别">
            <el-option label="男" value="男">
            </el-option>
            <el-option label="女" value="女">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model="employeeAddQuery.age"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input type="number" v-model="employeeAddQuery.tel"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identity">
          <el-input type="number" v-model="employeeAddQuery.identity"></el-input>
        </el-form-item>
        <el-form-item label="工资" prop="salary">
          <el-input v-model="employeeAddQuery.salary"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="showPwd">
          <el-input v-model="employeeAddQuery.password" :type="showPwd ? 'text' : 'password'" placeholder="默认密码为hotelname"></el-input>
          <el-checkbox v-model="showPwd"></el-checkbox>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <div v-if="employeeAddQuery.position == 'admin'">
            管理员
          </div>
          <el-select v-else v-model="employeeAddQuery.position" placeholder="请选择职位">
            <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEmployeeDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleEmployeeFormSubmit()">确 定</el-button>
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
          position: true
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
        }, {
          label: "服务员",
          value: "waiter"
        }],
        employeeQuery: {
          page: 1,
          size: 10,
          q: ""
        },
        employeeTableTitle: [{
            th: "姓名",
            td: "name"
          },
          {
            th: "登录名",
            td: "loginName"
          },
          {
            th: "性别",
            td: "sex"
          },
          {
            th: "年龄",
            td: "age"
          },
          {
            th: "身份证号",
            td: "identity"
          },
          {
            th: "工资",
            td: "salary"
          },
          {
            th: "联系方式",
            td: "tel"
          }
        ],
        employeeTableData: [],
        pagination: {
          total: "",
          page: "",
          size: ""
        },
        employeeAdd: false,
        employeeAddQuery: {
          name: "",
          loginName: "",
          sex: "男",
          age: "",
          password: "",
          identity: "",
          position: "",
          salary: "",
          tel: ""
        },

        delrow: "",
        showPwd: false,

        loading: false,

        rules: {
          name: {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          loginName: {
            required: true,
            message: "登录名不能为空",
            trigger: "blur"
          },
          identity: {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      handlePageChange(data) {
        if (data[0] == "size" && this.employeeQuery.size !== data[1]) {
          this.employeeQuery.page = 1;
          this.employeeQuery.size = data[1];
          this.__getEmployeeList();
        } else if (data[0] == "page" && this.employeeQuery.page !== data[1]) {
          this.employeeQuery.page = data[1];
          this.__getEmployeeList();
        }
      },
      handleDel(type) {
        if (type) {
          this.$Service.delEmployee({
            id: this.delrow.id
          }).then(res => {
            if (res.code == 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.$refs.dialogDelete.dialogOpen = false;
              this.delrow = "";
              if (this.employeeTableData.length == 1 && this.employeeQuery.page != 1) {
                this.employeeQuery.page--;
              }
              this.__getEmployeeList();
            } else {
              this.$message.error('删除失败');
            }
          })
        } else {
          this.delrow = "";
        }
      },
      handleEmployeeDelete(row) {
        this.delrow = row;
        this.$refs.dialogDelete.dialogOpen = true;
      },
      handleEmployeeEdit(row) {
        Object.assign(this.employeeAddQuery, row);
        this.employeeAdd = true;
      },
      handleAddEmployee() {
        this.employeeAdd = true;
      },
      handleEmployeeDialogClose() {
        this.employeeAdd = false;
        this.showPwd = false;
        delete this.employeeAddQuery.id;
        Object.assign(this.$data.employeeAddQuery, this.$options.data().employeeAddQuery);
      },
      handleEmployeeFormSubmit() {
        this.$refs["employeeAddQuery"].validate(valid => {
          if (valid) {
            if (!this.employeeAddQuery.password) {
              this.employeeAddQuery.password = "hotelname"
            }
            if (this.employeeAddQuery.id) {
              this.$Service.editEmployee(this.employeeAddQuery).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.employeeAdd = false;
                  delete this.employeeAddQuery.id;
                  Object.assign(this.$data.employeeAddQuery, this.$options.data().employeeAddQuery);
                  this.__getEmployeeList();
                } else {
                  this.$message.error('修改失败');
                }
              });
            } else {
              this.$Service.addEmployee(this.employeeAddQuery).then(res => {
                if (res.code == 1) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.employeeAdd = false;
                  Object.assign(this.$data.employeeAddQuery, this.$options.data().employeeAddQuery);
                  this.__getEmployeeList();
                } else {
                  this.$message.error('添加失败');
                }
              });
            }
          }
        });
      },
      __getEmployeeList() {
        this.$Service.getEmployeeList(this.employeeQuery).then(res => {
          if (res.code == 1) {
            this.employeeTableData = res.data.rows
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
      'employeeQuery.q': {
        handler: function() {
          if (this.loading) {
            return;
          }
          var _that = this;
          this.loading = true;
          setTimeout(function() {
            _that.__getEmployeeList();
            _that.loading = false;
          }, 500)
        },
      }
    },
    mounted() {
      this.__getEmployeeList();
    }
  }
</script>

<style scoped>
  >>>.el-form--inline .el-form-item__label {
    width: 80px !important;
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

  .employee-add {}

  .table-wrapper {
    margin-top: 18px;
  }

  .showPwd {
  }

  >>> .showPwd .el-checkbox {
    float: right;
    margin-top: -40px;
    margin-left: 8px;
  }

  >>> .showPwd .el-input__inner {
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
