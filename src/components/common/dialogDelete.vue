<!-- 确认删除对话框 -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    title="删除确认"
    :visible.sync="dialogOpen"
    width="30%"
    center
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClick('cancel')">取 消</el-button>
      <el-button type="primary" @click="handleDialogClick('sure')">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogOpen: false
    }
  },
  methods: {
    handleDialogClick(type) {
      if (type === "sure") {
        this.$emit("dialogClose", true);
      } else {
        this.$emit("dialogClose", false);
        this.dialogOpen = false;
      }
    }
  }
};
</script>

<style scoped>
>>> .el-dialog__footer {
  border-top: none;
}
</style>
