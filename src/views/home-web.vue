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
  <div class="more" v-if="tableData.length >= 45" @click="getMoreData">
    加载更多
  </div>
</div>
</template>

<script>
import bbHead from '../components/mobile/bb-head'
import api from '../api/api'
export default {
  components: {
    bbHead
  },
  data () {
    return {
      tableData: [],
      // dialogVisible: false,
      detailData: {},
      currentPage: 0,
      total: 400,
      searchParams: {
        name: '',
        startDate: new Date('2020-01-01')
      },
      start: 1
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
      this.searchParams.name = value
      this.getList()
    },
    getList () {
      const axiosData = Object.assign({}, this.searchParams, {
        startDate: new Date(this.searchParams.startDate).format('yyyy-MM-dd'),
        endDate: new Date().format('yyyy-MM-dd')
      },
      {
        start: this.start,
        size: 50
      })
      api.getList(axiosData).then(res => {
        this.tableData = res.data.records
      })
    },
    getMoreData () {
      this.start++
      this.getList()
    }
  },
  created () {
    this.getList()
  },
  activated () {
    this.getList()
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
