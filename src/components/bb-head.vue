<template>
  <div class="bb-head">
    <div class="top">
      <el-button type="primary" @click="$emit('showDialog')">记账</el-button>
    </div>
    <div class="form">
      <el-input v-model="value" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="$emit('search', value)">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bb-head',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
.bb-head{
  display: flex;
  .form{
    display: flex;
    flex: 1;
    justify-content: flex-end;
    .el-input{
      width: unset;
      margin-right: 20px;
    }
  }
}
</style>
