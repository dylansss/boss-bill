<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less">
/deep/.el-progress{
  width: 100px;
  .el-progress-circle{
    width: 100px!important;
    height: 100px!important;
  }
}
</style>
