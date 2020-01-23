<template>
<div class="h5-box">
  <bb-head
    @showDialog="newData"
    @search="search">
  </bb-head>
  <div class="list">
    <div class="item" v-for="(o, i) in tableData" :key="i" @click="viewDetail(o)">
      <div class="name">
        <div>
          {{o.name}}
        </div>
        <div
          :class="['status', {
            'red': o.status === '1',
            'orange': o.status === '2',
            'green': o.status === '0'
          }]">
          {{o.status === '0'? '已付清': o.status === '1'? '未付帐': '部分支付'}}
        </div>
      </div>
      <div class="right">
        <div class="money">
          {{o.money}}元
        </div>
        <div class="date">
          {{o.date}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import bbHead from '../components/mobile/bb-head'
export default {
  components: {
    bbHead
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          money: '11111',
          memo: '备注',
          status: '2'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          money: '11111',
          memo: '备注',
          status: '1'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          money: '11111',
          memo: '备注',
          status: '0'
        }
      ],
      // dialogVisible: false,
      detailData: {},
      currentPage: 0,
      total: 400
    }
  },
  methods: {
    newData () {
      this.$router.push('/h5-add')
    },
    viewDetail (row) {
      this.detailData = row
      localStorage.setItem('detailData', JSON.stringify((this.detailData)))
      this.$router.push('/h5-detail')
    },
    search (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>
.h5-box{
  display: flex;
  flex-flow: column;
}
.list{
  flex: 1;
  margin-top: 20px;
  .item{
    position: relative;
    display: flex;
    height: 60px;
    border-top: 1px solid #ccc;
    // margin-top: 20px;
    padding: 10px 0;
    box-sizing: border-box;
    .name{
      font-size: 18px;
      line-height: 40px;
      width: auto;
      display: flex;
    }
    .right{
      flex: 1;
      text-align: right;
      // text-indent: 3em;
      .money{
        font-weight: bold;
      }
    }
    .status{
      margin-left: 15px;
      &.red{
        color: red;
      }
      &.orange{
        color: orange;
      }
      &.green{
        color: green;
      }
    }
  }
}
</style>
