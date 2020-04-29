<!-- 通用表格 -->
<template>
  <div>
    <el-table
      ref="table"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-if="needList && needList.selection"
        type="selection"
        align="center"
      ></el-table-column>
      <template v-for="data of tableTitle">
        <el-table-column
          :prop="data.td"
          :label="data.th"
          :key="data.td"
          :min-width="getWidth(data)"
          :sortable="data.sortable"
        ></el-table-column>
      </template>
      <el-table-column
        label="职位"
        v-if="needList && needList.position"
        min-width="140"
      >
        <template slot-scope="scope">
          {{ positions[scope.row.position] }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已预定"
        v-if="needList && needList.isBook"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.isBook == 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否可用"
        v-if="needList && needList.isRent"
      >
        <template slot-scope="scope">
          {{ scope.row.isRent == 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已清理"
        v-if="needList && needList.isClean"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.isClean == 1 ? '已清理' : scope.row.isClean == 0 ? '未清理' : '清理中' }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已入住"
        v-if="needList && needList.isLive"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.isLive == 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已支付"
        v-if="needList && needList.isPay"
      >
        <template slot-scope="scope">
          {{ scope.row.isPay == 1 ? '已支付' : '未支付' }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        v-if="needList && needList.situation"
      >
        <template slot-scope="scope">
          {{ scope.row.situation != 0 ? (scope.row.situation == 1 ? '已完成' : '无法完成，已和顾客联系获得顾客理解') : '处理中' }}
        </template>
      </el-table-column>
      <el-table-column
        label="经理是否已同意"
        v-if="needList && needList.isAllow"
      >
        <template slot-scope="scope">
          {{ scope.row.isAllow == 0 ? '审批中' : (scope.row.isAllow == 1 ? '已同意' : '不同意') }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已采购"
        v-if="needList && needList.isBuy"
      >
        <template slot-scope="scope">
          {{ scope.row.isBuy == 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        v-if="operate"
        :width="getOperate()"
        fixed="right"
      >
        <template slot-scope="scope">
          <div class="operate-wrapper">
            <img
              v-if="operate.edit"
              class="operate"
              src="@/assets/img/operate-edit.png"
              srcset="@/assets/img/operate-edit@2x.png 2x"
              @click="handleEditClick(scope.row)"
            />
            <img
              v-if="operate.delete && scope.row.position != 'admin'"
              @click="handleOperateDelete(scope.row)"
              class="operate"
              src="@/assets/img/operate-delete.png"
              srcset="@/assets/img/operate-delete@2x.png 2x"
            />
            <div
              class="operate"
              title="预定"
              style="background: #57ABD8; display: inline-block"
              v-if="scope.row.isClean == 1 && !scope.row.livetime && !scope.row.isBook && scope.row.isRent == 1 && operate.book"
              @click="handleBookClick(scope.row)"
            >
              <i class="iconfont watch">&#xe6ae;</i>
            </div>
            <div
              class="operate"
              title="取消预定"
              style="background: red; display: inline-block"
              v-if="!scope.row.livetime && scope.row.isBook && scope.row.isRent == 1  && operate.book"
              @click="handleUnbookClick(scope.row)"
            >
              <i class="iconfont unbook">&#xe604;</i>
            </div>
            <div
              class="operate"
              title="入住"
              style="background: #57ABD8; display: inline-block"
              v-if="scope.row.isClean == 1 && !scope.row.livetime && scope.row.isRent == 1  && operate.live"
              @click="handleSetLive(scope.row)"
            >
              <i class="iconfont watch">&#xe67e;</i>
            </div>
            <div
              class="operate"
              title="退房"
              style="background: red; display: inline-block"
              v-if="scope.row.isClean && scope.row.livetime && scope.row.isRent == 1  && operate.live"
              @click="handleSetLeave(scope.row)"
            >
              <i class="iconfont watch">&#xe6ee;</i>
            </div>
            <div
              class="operate"
              title="查看详情"
              style="background: #85F2F2; display: inline-block"
              v-if="operate.watch"
              @click="handleEmitCustomer(scope.row)"
            >
              <i class="iconfont watch">&#xe62c;</i>
            </div>
            <div
              class="operate"
              title="接受"
              style="background: #85F2F2; display: inline-block"
              v-if="operate.receive && scope.row.isClean === 0"
              @click="handleEmitReceive(scope.row)"
            >
              <i class="iconfont watch">&#xe6a2;</i>
            </div>
            <!--
            <div
              class="operate"
              style="background: #E7A300; display: inline-block"
              v-if="operate.finish"
              @click="handleOperateFinish(scope.row)"
            >
              <img
              src="@/assets/img/finish-situation.png"
              srcset="@/assets/img/finish-situation@2x.png 2x"
            />
            </div>
            <div
              class="operate"
              style="background: #57ABD8; display: inline-block"
              v-if="operate.allow && scope.row.status == 'PENDING'"
              @click="handleEnroll(scope.row, 'admit')"
            >
              <i class="iconfont">&#xe63d;</i>
            </div>
            <div
              class="operate"
              style="background: #F2975A; display: inline-block"
              v-if="operate.reject && scope.row.status == 'PENDING'"
              @click="handleEnroll(scope.row, 'reject')"
            >
              <i class="iconfont">&#xe63c;</i>
            </div>
            <img
              v-if="operate.commondelete"
              @click="handleOperateCommonDelete(scope.row)"
              class="operate"
              src="@/assets/img/operate-delete.png"
              srcset="@/assets/img/operate-delete@2x.png 2x"
            />
            <img
              v-if="operate.persondelete"
              @click="handleOperatePersonDelete(scope.row)"
              class="operate"
              src="@/assets/img/operate-delete.png"
              srcset="@/assets/img/operate-delete@2x.png 2x"
            /> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableTitle: Array,
    operate: Object,
    needList: Object
  },
  data() {
    return {
      positions: {
        admin: "管理员",
        front: "前台",
        cleaner: "酒店清洁人员",
        logistics: "后勤人员",
        manager: "酒店经理",
        waiter: "服务员"
      },

      font: ""
    };
  },
  methods: {
    handleEmitReceive(row) {
      this.$emit("receive", row);
    },
    handleEmitCustomer(row) {
      this.$emit("watch", row.customerIdentity);
    },
    handleSetLeave(row) {
      this.$emit("leave", row);
    },
    // 入住
    handleSetLive(row) {
      this.$emit("live", row);
    },
    // 取消预订
    handleUnbookClick(row) {
      this.$emit("unbook", row);
    },
    // 预定
    handleBookClick(row) {
      this.$emit("book", row);
    },
    // 编辑
    handleEditClick(row) {
      this.$emit("edit", row);
    },
    // 删除
    handleOperateDelete(row) {
      this.$emit("delete", row);
    },
    // 获取选中的item
    getSelectedItem() {
      return this.$refs.table.selection;
    },
    getWidth(data) {
      switch (data.th) {
        case "房间号": case "性别":
          return 60;
        case "房间类型":
          return 80;
        case "价格/天":
          return 80;
        case "顾客身份证号": case "身份证号":
          return 170;
        case "顾客联系方式":
          return 120;
        case "押金":
          return 80;
        case "预定时间":
        case "入住时间":
        case "预计退房时间":
        case "清理时间":
          return 160;
        default:
          return 150;
      }
    },
    // getJudge(data) {
    //   if (data.th == "tableth.title") {
    //     let width = Number(this.font.substring(0, this.font.length - 2)) * 28;
    //     return width;
    //   }
    //   if (data.th == "tableth.headtitle") {
    //     let width = Number(this.font.substring(0, this.font.length - 2)) * 18;
    //     return width;
    //   }
    //   if (data.th == "tableth.order") {
    //     let width = Number(this.font.substring(0, this.font.length - 2)) * 4;
    //     return width;
    //   }
    //   if (data.th == "path.content") {
    //     let width = Number(this.font.substring(0, this.font.length - 2)) * 28;
    //     return width;
    //   }
    //   if (data.th == "tableth.updateTime") {
    //     let width =
    //       Number(this.font.substring(0, this.font.length - 2)) * 12.222;
    //     return width;
    //   }
    //   return null;
    // },
    // getDeadline() {
    //   let width = Number(this.font.substring(0, this.font.length - 2)) * 22;
    //   return width;
    // },
    // getStatus() {
    //   let width = Number(this.font.substring(0, this.font.length - 2)) * 3.9;
    //   return width * 2;
    // },
    getOperate() {
      let width = Number(this.font.substring(0, this.font.length - 2)) * 2.3;
      let num = Object.keys(this.operate).length;
      return (num + 2) * width;
    }
    // getSelect() {
    //   let width = Number(this.font.substring(0, this.font.length - 2)) * 2.9;
    //   return width;
    // }
  },
  mounted() {
    this.font = document.documentElement.style.fontSize;
  }
};
</script>

<style scoped>
>>> .el-radio__label {
  display: none;
}

>>> .checkbox,
.radio {
  margin-top: 0;
}

.operate-wrapper {
}

.operate {
  width: 40px;
  height: 30px;
  line-height: 31px;
  text-align: center;
  color: #fff;
  vertical-align: top;
  cursor: pointer;
}

.operate i {
  font-size: 18px;
}

.iconfont.watch {
  font-size: 16px;
}

.iconfont.unbook {
  font-size: 19.5px;
}

>>> .el-switch__core {
  width: 60px !important;
  height: 29.19px !important;
  border-radius: 14.595px;
  border: 1.46px solid #dcdfe6;
}

>>> .el-switch__core:after {
  width: 23.352px;
  height: 23.352px;
  top: 1.6px;
  left: 2.9px;
}

>>> .el-switch.is-checked .el-switch__core::after {
  margin-left: -26.2px;
}
</style>
