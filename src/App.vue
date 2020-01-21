<template>
<div>
  <bb-head
    @showDialog="newData"
    @search="search">
  </bb-head>
  <el-table
    :data="tableData"
    stripe
    border
    height="530"
    style="width: 100%"
    @row-click="viewDetail">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="memo"
      label="备注">
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <add-modal
  :dialogVisible="dialogVisible"
  :detailData="detailData"
  @onSubmit="onSubmit"
  @cancel="cancel"></add-modal>
</div>
</template>

<script>
import addModal from './views/add-modal'
import bbHead from './components/bb-head'
export default {
  components: {
    addModal,
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
        }
      ],
      dialogVisible: false,
      detailData: {},
      currentPage: 0,
      total: 400
    }
  },
  methods: {
    newData () {
      this.dialogVisible = true
      this.detailData = {
        name: '',
        date: new Date(),
        money: '',
        memo: '',
        status: '2'
      }
    },
    onSubmit (params) {
      console.log(params)
      this.dialogVisible = false
      this.tableData.push(params)
    },
    cancel () {
      this.dialogVisible = false
    },
    viewDetail (row, column, event) {
      this.detailData = row
      this.dialogVisible = true
    },
    search (value) {
      console.log(value)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination{
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  /deep/ .el-pagination__sizes{
    flex: 1;
  }
}
.el-table{
  margin-top: 20px;
}
</style>
