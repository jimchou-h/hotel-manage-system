<template>
  <div class="wrapper">
    <div class="title">
      未打卡人数 {{ cardFalseList.length }}
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="cardFalseList" :tableTitle="cardTableTitle"></ele-table>
    </div>
    <div class="title marginAdd">
      已打卡人数 {{ cardTureList.length }}
    </div>
    <div class="table-wrapper">
      <ele-table ref="table" :tableData="cardTureList" :tableTitle="cardTableTitle"></ele-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cardTureList: [],
        cardFalseList: [],
        cardQuery: {
          page: 1,
          size: 10,
          income: true
        },
        cardTableTitle: [{
            th: "姓名",
            td: "name"
          },
          {
            th: "联系方式",
            td: "tel"
          },
          {
            th: "职位",
            td: "position"
          },
          {
            th: "打卡时间",
            td: "cardTime"
          }
        ],
        pagination: {
          total: "",
          page: "",
          size: ""
        }
      }
    },
    methods: {
      __getCardList() {
        this.$Service.getCardList(this.cardQuery).then(res => {
          if (res.code == 1) {
            const arr = res.data;
            for (let i = 0, len = arr.length; i < len; i++) {
              if (arr[i].card == 0) {
                this.cardFalseList.push(arr[i])
              } else {
                this.cardTureList.push(arr[i])
              }
            }
          } else {
            this.$message.error(res.message);
          }
        })
      }
    },
    created() {
      this.__getCardList();
    }
  }
</script>

<style scoped>
  >>>.el-form--inline .el-form-item__label {
    width: 100px !important;
  }

  >>>.el-form-item__content .el-input__inner {
    width: 220px !important;
  }

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
  }
  .table-wrapper {
    margin-top: 18px;
  }

  .marginAdd {
    margin-top: 70px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
