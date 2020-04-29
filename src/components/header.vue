<template>
  <div style="height: 100%">
    <div
      class="header-wrapper"
      v-if="$store.state.personal"
    >
      <span class="logo-font">青年酒店</span>
      <el-button
        class="close-button"
        type="info"
        title="收起"
        @click="handleClose()"
      ><i class="iconfont">&#xe985;</i></el-button>
      <span class="welcome-tips">
        <span v-if="!$store.state.personal.name">尊敬的{{ positions[$store.state.personal.position] }}，您好&nbsp;</span>
        <div
          class="person"
          @click="handleShowBox($event)"
          v-if="$store.state.personal.name"
        >
          <i
            class="iconfont"
            title="个人信息"
          >&#xe610;</i>
          <div class="showPerSonBox" v-if="isShow">
            <div class="show-name">姓名: {{ $store.state.personal.name }}</div>
            <div class="show-position">职位: {{ positions[$store.state.personal.position] }}</div>
            <div class="show-button" v-if="!$store.state.personal.card" @click="handleCard()">立刻打卡</div>
            <div class="show-button" style="background: gray" v-else>已打卡</div>
          </div>
        </div>
        <span
          class="logout"
          @click="handleLogout()"
        ><i
            class="iconfont"
            style="color: red"
            title="退出"
          >&#xe600;</i></span>
      </span>
    </div>
    <div class="section" style="display: flex; width: 100%">
      <div
        class="menu-wrapper"
      >
        <el-menu
          v-if="navs.length > 0"
          class="el-menu-vertical-demo"
          :collapse="isClose"
          background-color="#000"
          :router="true"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
        >
          <template v-for="(item, index) of navs">
            <el-menu-item
              v-if="!item.children"
              :key="index"
              :index="item.path"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
            </el-menu-item>
            <el-submenu
              v-else
              :key="index"
              :index="index + ''"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="(item, index) of item.children"
                :key="index"
                :index="item.path"
              >
                <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="router-wrapper">
        <router-view />
        <div class="banquan"><span class="banquan-font">酒店服务热线：020-123456789
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            hjz中山大学新华学院2020</span></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClose: false,
      isShow: false,

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
        waiter: [
          {
            name: "顾客需求管理",
            path: "/main/waiter/index"
          }
        ],
        customer: [
          {
            name: "首页",
            path: "/main/customer/index"
          },
          {
            name: "顾客意见管理",
            path: "/main/customer/situation"
          },
          {
            name: "顾客添加需求",
            path: "/main/customer/demand"
          },
          {
            name: "周边景点查看",
            path: "/main/customer/look"
          }
        ],
        admin: [
          {
            name: "员工管理",
            path: "/main/admin/index"
          },
          {
            name: "客房管理",
            path: "/main/admin/room"
          }
        ],
        cleaner: [
          {
            name: "客房清洁管理",
            path: "/main/cleaner/index"
          }
        ],
        front: [
          {
            name: "客房订住管理",
            path: "/main/front/index"
          },
          {
            name: "收银管理",
            path: "/main/front/money"
          }
        ],
        logistics: [
          {
            name: "账单支出管理",
            path: "/main/logistics/index"
          }
        ],
        manager: [
          {
            name: "报表统计",
            path: "/main/manager/index",
            children: [
              {
                name: "总收入支出统计",
                path: "/main/manager/index"
              },
              {
                name: "收入明细",
                path: "/main/manager/income"
              },
              {
                name: "支出明细",
                path: "/main/manager/pay"
              },
              {
                name: "顾客意见统计",
                path: "/main/manager/situation"
              },
              {
                name: "顾客需求统计",
                path: "/main/manager/demand"
              },
              {
                name: "顾客入住次数统计",
                path: "/main/manager/live"
              }, {
                name: "阶段入住人数统计",
                path: "/main/manager/dayperiod"
              }, {
                name: "当日打卡人数统计",
                path: "/main/manager/card"
              }
            ]
          },
          {
            name: "账单支出审核",
            path: "/main/manager/payment"
          }
        ]
      }
    };
  },
  methods: {
    handleCard() {
      const { loginName, position } = this.$store.state.personal
      let d = new Date()
      let cardTime = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '')  + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
      this.$Service.setCard({
        cardTime,
        loginName,
        position
      }).then(res => {
        if (res.code == 1) {
          this.$store.state.personal.card = 1;
          this.$forceUpdate();
        }
      })
    },
    handleShowBox(e) {
      if (e.target.className === 'person' || e.target.className === 'iconfont') {
        this.isShow = !this.isShow;
      }
    },
    handleClose() {
      this.isClose = !this.isClose;
    },
    handleLogout() {
      if (this.$store.state.personal.position == "customer") {
        this.$message({
          message: "退出成功，即将跳转登录界面",
          type: "success"
        });
        setTimeout(() => {
          this.$store.commit("delPersonal");
          this.$router.push("/login");
        }, 1000);
      } else {
        this.$Service.logout().then(res => {
          if (res.code == 1) {
            this.$message({
              message: "退出成功，即将跳转登录界面",
              type: "success"
            });
            setTimeout(() => {
              this.$store.commit("delPersonal");
              this.$router.push("/login");
            }, 1000);
          } else {
            this.$message.error("退出失败");
          }
        });
      }
    },
    __dataInit() {
      if (this.$store.state.personal) {
        this.navs = this.navs.concat(
          this.navsSelection[this.$store.state.personal.position]
        );
      }
    }
  },
  mounted() {
    this.__dataInit();
  }
};
</script>

<style scoped>

.header-wrapper {
  position: relative;
  width: 100%;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  background: #000000;
  color: #fff;
  border-bottom: 1px solid #000;
}

.header-wrapper .logo-font {
  display: inline-block;
  width: 200px;
  text-align: center;
  background: #000;
  background-color: cadetblue;
}

.close-button {
  margin: -1px 0 0 5px;
}

.close-button:hover {
  opacity: 0.3;
}

.welcome-tips {
  float: right;
  margin-right: 20px;
}

.person {
  display: inline-block;
  position: relative;
  text-align: center;
}

.logout,
.person {
  cursor: pointer;
  font-size: 18px;
}

.showPerSonBox::before {
  content: "";
  position: absolute;
  right: 22px;
  top: -10px;
  display: block;
  margin-left: -5px;
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 5px solid transparent;
  border-bottom-color: #000;
}

.showPerSonBox {
  position: absolute;
  top: 75px;
  left: -143px;
  width: 180px;
  background: #000;
  z-index: 9998;
  border-radius: 3px;
  padding: 10px 0 0 0;
}

.show-name, .show-position {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}

.show-button {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: red;
  color: #fff;
  border-radius: 0 0 3px 3px;
}

.section {
  height: calc(100% - 65px);
  margin-top: -5px;
  overflow-y: hidden;
}

.menu-wrapper {
  height: 100%;
  width: auto;
  background: #000000;
  margin-top: -1px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.router-wrapper {
  flex: 1;
  height: calc(100% - 70px);
  padding-bottom: 100px;
  overflow-y: scroll;
  background: #eee;
}

.banquan {
  padding-left: 0px;
  position: fixed;
  bottom: 0;
  background: #aaa;
  color: #fff;
  height: 60px;
  line-height: 60px;
  width: 100vw;
  text-align: center;
  z-index: 9999;
}

.banquan-font {
  margin-left: -434px;
}
</style>
