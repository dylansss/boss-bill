<template>
<div>
  <el-button type="primary" @click="dialogVisible = true">记账</el-button>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
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
      prop="memo"
      label="备注">
    </el-table-column>
  </el-table>
  <add-modal :dialogVisible="dialogVisible" @onSubmit="onSubmit"></add-modal>
</div>
</template>

<script>
import addModal from './views/add-modal'
export default {
  components: {
    addModal
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          money: '11111',
          memo: '备注'
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    onSubmit (params) {
      console.log(params)
      this.dialogVisible = false
      this.tableData.push(params)
    }
  }
}
</script>
