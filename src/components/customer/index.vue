<template>
  <div>
    <div class="form-wrapper">
      <el-form :rules="rules" :model="query" ref="query">
        <el-form-item label="房间号" prop="number" class="small">
          <el-input type="number" v-model="query.number" placeholder="请输入您当前居住的房间号"></el-input>
        </el-form-item>
        <el-form-item label="为我们酒店评分" prop="star">
          <div class="rate-wrapper">
            <el-rate v-model="query.star" show-text>
            </el-rate>
          </div>
        </el-form-item>
        <el-form-item label="您的建议" prop="situation">
          <el-input v-model="query.situation" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="" prop="situation">
          <el-button type="primary" @click="handleFormSubmit()">提交</el-button>
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
          star: 0,
          situation: ""
        },
        rules: {
          number: {
            required: true,
            message: "房间号不能为空",
            trigger: "blur"
          },
          star: {
            required: true,
            message: "评分不能为空",
            trigger: "blur"
          },
        }
      }
    },
    methods: {
      handleFormSubmit() {
        this.$refs["query"].validate(valid => {
          if (valid) {
            this.$Service.saveSituation(this.query).then(res => {
              if (res.code == 1) {
                this.$message({
                  message: '反馈成功，谢谢您的反馈，我们会认真听取并努力改进',
                  type: 'success'
                });
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
    width: 240px !important;
  }

  .form-wrapper {
    margin: 40px;
  }

  .rate-wrapper {
    margin-top: 12px;
  }
</style>
