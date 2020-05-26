<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'App',
    computed: mapState({
      personal: (state) => state.personal,
    }),
    methods: {
      checkCards() {
        const { loginName, position } = this.personal
        this.$Service.checkCard({
          loginName,
          position
        }).then(res => {
          if (res.code == 1) {
            this.setCards(res.data.card)
          }
        })
      },
      ...mapMutations([
        'setCards'
      ])
    },
    created() {
      window.addEventListener("beforeunload", () => {
        this.$Cache.set("personal", this.personal, true);
      });
    },
    mounted() {
      if (this.personal) {
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
