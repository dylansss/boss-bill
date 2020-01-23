<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {

}
</script>

<style lang="less">
/deep/.el-progress{
  width: 100px;
  .el-progress-circle{
    width: 100px!important;
    height: 100px!important;
  }
}
</style>
