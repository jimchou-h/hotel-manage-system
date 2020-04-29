<template>
  <div class="bgImage">
    <div class="header-wrapper">
      <span class="logo-font">欢迎登陆酒店管理系统</span>
    </div>
    <img
      class="backgeound-image"
      src="@/assets/img/hotel.png"
    />
    <div class="login-wrapper">
      <div class="login-title">Login</div>
      <div class="login-body">
        <el-form
          :inline="true"
          :model="query"
          ref="query"
          :rules="rules"
        >
          <el-form-item
            label=""
            prop="loginName"
            v-if="query.position != 'customer'"
          >
            <el-input
              v-model="query.loginName"
              placeholder="请输入登录名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="password"
            v-if="query.position != 'customer'"
          >
            <el-input
              v-model="query.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="position"
          >
            <el-select
              v-model="query.position"
              placeholder="请选择职位"
            >
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-button">
        <el-button
          type="primary"
          @click="handleLogin()"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: "外部",
          positions: [
            {
              label: "顾客",
              value: "customer"
            }
          ]
        },
        {
          label: "内部",
          positions: [
            {
              label: "管理员",
              value: "admin"
            },
            {
              label: "前台",
              value: "front"
            },
            {
              label: "酒店清洁人员",
              value: "cleaner"
            },
            {
              label: "后勤人员",
              value: "logistics"
            },
            {
              label: "酒店经理",
              value: "manager"
            },
            {
              label: "服务员",
              value: "waiter"
            }
          ]
        }
      ],
      positions: [
        {
          label: "顾客",
          value: "customer"
        },
        {
          label: "管理员",
          value: "admin"
        },
        {
          label: "前台",
          value: "front"
        },
        {
          label: "酒店清洁人员",
          value: "cleaner"
        },
        {
          label: "后勤人员",
          value: "logistics"
        },
        {
          label: "酒店经理",
          value: "manager"
        },
        {
          label: "服务员",
          value: "waiter"
        }
      ],
      query: {
        loginName: "",
        password: "",
        position: "customer"
      },

      rules: {
        name: {
          loginName: true,
          message: "登录名不能为空",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    handleLogin() {
      if (this.query.position == "customer") {
        this.$message({
          message: "登陆成功，即将跳转主界面",
          type: "success"
        });
        this.$store.commit(
          "setPersonal",
          Object.assign(this.query, {
            name: ""
          })
        );
        setTimeout(() => {
          this.$router.push("/main/customer/index");
        }, 1000);
      } else {
        if (!this.query.loginName) {
          this.$message.error("登录名不能为空");
          return;
        }
        if (!this.query.password) {
          this.$message.error("密码不能为空");
          return;
        }
        if (!this.query.position) {
          this.$message.error("职位不能为空");
          return;
        }
        this.$Service.login(this.query).then(res => {
          if (res.code == 1) {
            this.$message({
              message: "登陆成功，即将跳转主界面",
              type: "success"
            });
            this.$store.commit(
              "setPersonal",
              Object.assign(this.query, res.data)
            );
            setTimeout(() => {
              switch (this.query.position) {
                case "admin":
                  this.$router.push("/main/admin/index");
                  break;
                case "cleaner":
                  this.$router.push("/main/cleaner/index");
                  break;
                case "front":
                  this.$router.push("/main/front/index");
                  break;
                case "logistics":
                  this.$router.push("/main/logistics/index");
                  break;
                case "manager":
                  this.$router.push("/main/manager/index");
                  break;
                case "waiter":
                  this.$router.push("/main/waiter/index");
                  break;
              }
            }, 1000);
          } else {
            this.$message.error("登录失败");
          }
        });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
>>> .el-button--primary {
  background-color: #20a8d8 !important;
  border-color: #20a8d8 !important;
}

.header-wrapper {
  position: relative;
  width: 100%;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  background: #000000;
  color: #fff;
  box-sizing: border-box;
}

.header-wrapper .logo-font {
  margin-left: 50px;
}

.bgImage {
  position: relative;
  width: 100%;
  height: 100vh;
}

.backgeound-image {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

.login-wrapper {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background: #fff;
  font-size: 16px;
  border-radius: 3px;
}

.login-title {
  background: #414141;
  color: white;
  text-align: center;
  padding: 15px;
  text-transform: uppercase;
}

.login-body {
  width: 100%;
  height: auto;
  padding: 36px 20px 0 20px;
}

>>> .el-form--inline .el-form-item__label {
  width: 80px;
}

>>> .el-input__inner {
  width: 355px;
}

.login-button {
  width: auto;
  height: 40px;
  margin: 18px;
}

>>> .el-button {
  width: 100% !important;
  font-size: 18px;
}
</style>
