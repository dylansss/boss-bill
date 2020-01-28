<template>
  <div class="bb-head">
    <div class="top">
      <el-button type="primary" @click="$emit('showDialog')">记账</el-button>
    </div>
    <div class="form">
      <el-form :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="date">
          <el-date-picker
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="ruleForm.startDate"
          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="date">
          <el-date-picker
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="ruleForm.endDate"
          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item class="last" label="欠款状态">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="3">全部</el-radio>
            <el-radio label="0">已还清</el-radio>
            <el-radio label="1">部分还清</el-radio>
            <el-radio label="2">未还</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bb-head',
  data () {
    return {
      ruleForm: {
        name: '',
        status: '3',
        startDate: new Date('2020-01-01'),
        endDate: new Date()
      }
    }
  },
  methods: {
    handleSearch () {
      const params = {
        startDate: this.ruleForm.startDate,
        endDate: this.ruleForm.endDate,
        name: this.ruleForm.name
      }
      if (this.ruleForm.status !== '3') {
        params.status = this.ruleForm.status
      }
      this.$emit('search', params)
    }
  }
}
</script>

<style lang="less" scoped>
.bb-head{
  // display: flex;
  .form{
    display: flex;
    flex: 1;
    justify-content: flex-start;
    margin-top: 20px;
    /deep/ .el-form{
      flex: 1;
      display: flex;
      /deep/.el-form-item{
        display: flex;
        margin-left: 15px;
        /deep/.el-form-item__label{
          width: auto!important;
          padding: 0;
        }
        /deep/.el-form-item__content{
          margin-left: 10px!important;
          width: 200px;
        }
        &.last{
          /deep/.el-form-item__content{
            margin-left: 10px!important;
            width: auto;
          }
        }
        /deep/.el-radio{
          margin-right: 10px;
          /deep/.el-radio__label{
            padding-left: 2px;
          }
        }
      }
    }
  }
  .el-button{
    width: 100px;
    height: 40px;
    margin-left: 15px;
  }
}
</style>
