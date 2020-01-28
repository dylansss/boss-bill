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
    :current-page="start"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <add-modal
  :dialogVisible="dialogVisible"
  @onSubmit="onSubmit"
  @cancel="dialogVisible = false"></add-modal>
  <detail-modal
  :detailDialogVisible="detailDialogVisible"
  :detailData="detailData"
  @cancel="detailDialogVisible = false"></detail-modal>
</div>
</template>

<script>
import addModal from '../components/pc/add-modal'
import detailModal from '../components/pc/detail-modal'
import bbHead from '../components/pc/bb-head'
import api from '../api/api'
export default {
  components: {
    addModal,
    detailModal,
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
      detailDialogVisible: false,
      detailData: {},
      start: 0,
      size: 100,
      total: 400
    }
  },
  methods: {
    newData () {
      this.dialogVisible = true
      // this.detailData = {
      //   name: '',
      //   date: new Date(),
      //   money: '',
      //   memo: '',
      //   status: '2'
      // }
    },
    onSubmit () {
      // console.log(params)
      this.$message({
        message: '账单已保存',
        type: 'success'
      })
      this.dialogVisible = false
      // this.tableData.push(params)
    },
    // cancel () {
    //   this.dialogVisible = false
    // },
    viewDetail (row, column, event) {
      this.detailData = row
      this.detailDialogVisible = true
    },
    search (params) {
      console.log(params)
      const axiosData = Object.assign({}, params, {
        start: this.start,
        size: this.size
      })
      api.getList(axiosData).then(res => {
        this.tableData = res.data
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.start = 1
      this.search()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.start = val
      this.search()
      // console.log(`当前页: ${val}`)
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
