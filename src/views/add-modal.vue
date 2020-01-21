<template>
  <el-dialog
    title="提示"
    :visible.sync="isShowDialog"
    width="50%">
    <!-- <el-form ref="form"  :rules="rules" :model="form" label-width="80px"> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="ruleForm.date"
        style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="金额" prop="money">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label="欠款状态">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="0">已还清</el-radio>
          <el-radio label="1">部分还清</el-radio>
          <el-radio label="2">未还</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.memo"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-moadl',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: () => {
        return {
          name: '',
          date: new Date(),
          money: '',
          memo: '',
          status: '2'
        }
      }
    }
  },
  computed: {
    isShowDialog: {
      get () {
        console.log('你俩谁先啊')
        return this.dialogVisible
      },
      set () {
        console.log('咋用的啊？')
        // this.$emit('cancel')
        this.cancel()
      }
    }
  },
  data () {
    return {
      // isShowDialog: this.dialogVisible,
      ruleForm: {
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.ruleForm)
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  watch: {
    isShowDialog () {
      this.ruleForm = this.detailData
    }
  }
}
</script>

<style>

</style>
