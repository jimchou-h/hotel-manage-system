<template>
  <div>
    <div class="header-wrapper">
      <span class="logo-font">酒店管理系统</span>
      <span class="logo-tel" v-if="$store.state.personal.position == 'customer'">联系方式：123456789</span>
      <span class="welcome-tips">
        欢迎你, {{ positions[$store.state.personal.position] + " " + $store.state.personal.loginName }}
        &nbsp;
        <span class="logout" @click="handleLogout()">退出</span>
      </span>
    </div>
    <div style="display: flex;">
      <div class="menu-wrapper" v-if="navs.length > 0">
        <el-menu class="el-menu-vertical-demo" background-color="#000" :router="true" text-color="#fff"
          active-text-color="#ffd04b" :default-active="$route.path">
          <template v-for="(item, index) of navs">
            <el-menu-item v-if="!item.children" :key="index" :index="item.path">
              <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
            </el-menu-item>
            <el-submenu v-else :key="index" :index="index + ''">
              <template slot="title">
                <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(item, index) of item.children" :key="index" :index="item.path">
                <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="router-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        positions: {
          admin: "管理员",
          front: "前台",
          cleaner: "酒店清洁人员",
          logistics: "后勤人员",
          manager: "酒店经理",
          customer: "顾客",
          waiter: "服务员"
        },

        navs: [],
        navsSelection: {
          waiter: [{
            name: "顾客需求管理",
            path: "/main/waiter/index"
          }],
          customer: [{
            name: "顾客意见管理",
            path: "/main/customer/index"
          }, {
            name: "顾客添加需求",
            path: "/main/customer/demand"
          }, {
            name: "周边景点查看",
            path: "/main/customer/look"
          }],
          admin: [{
            name: "员工管理",
            path: "/main/admin/index"
          }, {
            name: "客房管理",
            path: "/main/admin/room"
          }],
          cleaner: [{
            name: "客房清洁管理",
            path: "/main/cleaner/index"
          }],
          front: [{
            name: "客房订住管理",
            path: "/main/front/index"
          }, {
            name: "收银管理",
            path: "/main/front/money"
          }],
          logistics: [{
            name: "账单支出管理",
            path: "/main/logistics/index"
          }],
          manager: [{
            name: "报表统计",
            path: "/main/manager/index",
            children: [{
              name: "总收入支出统计",
              path: "/main/manager/index",
            }, {
              name: "收入明细",
              path: "/main/manager/income",
            }, {
              name: "支出明细",
              path: "/main/manager/pay",
            }, {
              name: "顾客意见统计",
              path: "/main/manager/situation",
            }, {
              name: "顾客需求统计",
              path: "/main/manager/demand",
            }, {
              name: "顾客入住次数统计",
              path: "/main/manager/live",
            }]
          }, {
            name: "账单支出审核",
            path: "/main/manager/payment",
          }]
        }
      }
    },
    methods: {
      handleLogout() {
        if (this.$store.state.personal.position == 'customer') {
          this.$message({
            message: '退出成功，即将跳转登录界面',
            type: 'success'
          });
          setTimeout(() => {
            this.$store.commit("delPersonal");
            this.$router.push("/login")
          }, 1000)
        } else {
          this.$Service.logout().then(res => {
            if (res.code == 1) {
              this.$message({
                message: '退出成功，即将跳转登录界面',
                type: 'success'
              });
              setTimeout(() => {
                this.$store.commit("delPersonal");
                this.$router.push("/login")
              }, 1000)
            } else {
              this.$message.error('退出失败');
            }
          })
        }

      },
      __dataInit() {
        if (this.$store.state.personal) {
          this.navs = this.navs.concat(this.navsSelection[this.$store.state.personal.position])
        }
      }
    },
    mounted() {
      this.__dataInit();
    }
  }
</script>

<style>
  .header-wrapper {
    position: relative;
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    background: #000000;
    color: #fff;
  }

  .header-wrapper .logo-font {
    margin-left: 50px;
  }

  .header-wrapper .logo-tel {
    margin-left: 50px;
  }

  .welcome-tips {
    float: right;
    margin-right: 20px;
  }

  .logout {
    text-decoration: underline;
    cursor: pointer;
  }

  .menu-wrapper {
    flex: 0 0 225px;
    height: calc(100vh - 64px);
    background: #000000;
  }

  .router-wrapper {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>
