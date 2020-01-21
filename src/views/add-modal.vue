<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form.date"
        style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="form.money"></el-input>
      </el-form-item>
      <el-form-item label="欠款状态">
        <el-radio-group v-model="form.status">
          <el-radio label="0">已还清</el-radio>
          <el-radio label="1">部分还清</el-radio>
          <el-radio label="2">未还</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.memo"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onSubmit">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-moadl',
  props: ['dialogVisible'],
  data () {
    return {
      form: {
        name: '',
        date: new Date(),
        money: '',
        memo: '',
        status: '2'
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        data: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // debugger
      this.$emit('onSubmit', this.form)
    }
  }
}
</script>

<style>

</style>
