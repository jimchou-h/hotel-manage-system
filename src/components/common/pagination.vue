<template>
  <el-pagination
    background
    prev-text="上一页"
    next-text="下一页"
    layout='prev, pager, next,sizes, jumper, total'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.number"
    :page-sizes="[10, 25, 50, 100]"
    :page-size="pagination.size"
    :total="Number(pagination.total)"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    pagination: Object
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('change', 'size', val)
    },
    handleCurrentChange(val) {
      this.$emit('change', 'page', val)
    }
  },
  data() {
    return {
      currentPage: 1
    };
  }
};
</script>

<style scoped>
>>> .el-input__inner {
  width: 100% !important;
}
</style>
