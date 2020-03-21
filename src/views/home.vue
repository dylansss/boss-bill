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
    height="440"
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
      <template slot-scope="scope">
        <div>{{statusList[scope.row.status]}}</div>
      </template>
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
  @onSubmit="onSubmit"
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
      statusList: {
        0: '已还清',
        1: '部分还清',
        2: '未还'
      },
      tableData: [],
      dialogVisible: false,
      detailDialogVisible: false,
      detailData: {},
      start: 1,
      size: 100,
      total: 400,
      searchParams: {
        name: '',
        startDate: new Date('2020-01-01'),
        endDate: new Date()
      }
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
    onSubmit (type) {
      this.$message({
        message: '账单已保存',
        type: 'success'
      })
      if (type === 1) {
        this.dialogVisible = false
      } else {
        this.detailDialogVisible = false
      }
      this.getList()
    },
    viewDetail (row, column, event) {
      this.detailData = row
      this.detailDialogVisible = true
    },
    search (params) {
      this.searchParams = params
      this.start = 1
      this.getList()
    },
    getList () {
      const axiosData = Object.assign({}, this.searchParams, {
        start: this.start,
        size: this.size
      }, {
        startDate: new Date(this.searchParams.startDate).format('yyyy-MM-dd'),
        endDate: new Date(this.searchParams.endDate).format('yyyy-MM-dd')
      })
      api.getList(axiosData).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.start = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.start = val
      this.getList()
    }
  },
  created () {
    this.getList()
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
