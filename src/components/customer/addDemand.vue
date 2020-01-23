<template>
  <div>
    <div class="form-wrapper">
      <el-form :rules="rules" :model="query" ref="query">
        <el-form-item label="房间号" prop="number" class="small">
          <el-input v-model="query.number" placeholder="请输入您当前居住的房间号"></el-input>
        </el-form-item>
        <el-form-item label="您的手机号" prop="tel" class="small">
          <el-input type="number" v-model="query.tel"></el-input>
        </el-form-item>
        <el-form-item label="您的需求" prop="demand">
          <el-input v-model="query.demand" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="" prop="situation">
          <el-button type="primary" @click="handleFormSubmit()">提交</el-button>
        </el-form-item>
        <el-form-item label="" v-if="showTips">
          提交成功，我们将会马上处理，请注意手机铃声和敲门声，或者电话联系我们123456789
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          number: "",
          tel: "",
          demand: ""
        },
        showTips: false,
        rules: {
          number: {
            required: true,
            message: "房间号不能为空",
            trigger: "blur"
          },
          tel: {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          demand: {
            required: true,
            message: "您的需求不能为空",
            trigger: "blur"
          },
        }
      }
    },
    methods: {
      handleFormSubmit() {
        this.$refs["query"].validate(valid => {
          if (valid) {
            this.$Service.handleDemand(this.query).then(res => {
              if (res.code == 1) {
                this.showTips = true;
              } else {
                this.$message.error('反馈失败，请重新再试试吧');
              }
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
  >>>.small .el-input__inner {
    width: 200px !important;
  }

  .form-wrapper {
    margin: 40px;
  }

  .rate-wrapper {
    margin-top: 12px;
  }
</style>
