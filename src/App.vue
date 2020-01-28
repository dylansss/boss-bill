<template>
  <div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import api from './api/api'
export default {
  created () {
    // api('/user', 'GET', { a: 1 })
    // axios.get('/user?ID=12345')
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
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
