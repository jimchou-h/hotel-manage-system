<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      checkCards() {
        const { loginName, position } = this.$store.state.personal
        this.$Service.checkCard({
          loginName,
          position
        }).then(res => {
          if (res.code == 1) {
            this.$store.state.personal.card = res.data.card
          }
        })
      }
    },
    created() {
      window.addEventListener("beforeunload", () => {
        this.$Cache.set("personal", this.$store.state.personal, true);
      });
    },
    mounted() {
      if (this.$store.state.personal) {
        this.checkCards()
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%
  }

  #app {
    height: 100%;
    font-family: PingFangSC-Medium, PingFang SC;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
