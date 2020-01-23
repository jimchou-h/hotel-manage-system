<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      window.addEventListener("beforeunload", () => {
        this.$Cache.set("personal", this.$store.state.personal, true);
      });
    }
  }
</script>

<style>
  #app {
    height: 100%;
    font-family: PingFangSC-Medium, PingFang SC;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
