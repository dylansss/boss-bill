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
      <el-form-item label="上传图片">
        <el-upload
          action="http://106.54.44.66:8080/watter/fq/file"
          multiple
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="elDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import api from '../../api/api'
export default {
  name: 'add-moadl',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShowDialog: {
      get () {
        return this.dialogVisible
      },
      set () {
        // this.$emit('cancel')
        this.cancel()
      }
    }
  },
  data () {
    return {
      imgList: [],
      fileList: [],
      dialogImageUrl: '',
      elDialogVisible: false,
      // isShowDialog: this.dialogVisible,
      ruleForm: {
        name: '',
        date: new Date(),
        money: '',
        memo: '',
        status: '2',
        picUrl: ''
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
          this.ruleForm.picUrl = this.imgList.map(v => {
            return v.url
          }).join(',')
          api.save(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.$emit('onSubmit', 1)
            }
          })
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$emit('cancel')
    },
    handleRemove (file, fileList) {
      this.imgList = fileList.map(v => {
        return {
          name: v.name,
          url: v.response ? v.response.data : v.url
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.elDialogVisible = true
    },
    handleSuccess (response, file, fileList) {
      const obj = {
        name: '',
        url: response.data
      }
      this.imgList.push(obj)
    }
  },
  watch: {
    isShowDialog (v) {
      this.ruleForm = {
        name: '',
        date: new Date(),
        money: '',
        memo: '',
        status: '2',
        picUrl: ''
      }
      this.imgList = []
      this.fileList = []
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-dialog{
  /deep/.el-dialog__header{
    padding: 10px 20px 0px;
  }
  /deep/.el-dialog__body{
    padding: 15px 10px;
    .el-form{
      .el-form-item{
        margin-bottom: 15px;
      }
    }
  }
  /deep/.el-dialog__footer{
    padding: 0px 20px 10px;
  }
}
/deep/.el-upload{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/.el-upload-list{
  /deep/.el-upload-list__item{
    width: 100px;
    height: 100px;
  }
}
/deep/.el-progress{
  width: 100px;
  .el-progress-circle{
    width: 100px!important;
    height: 100px!important;
  }
}
</style>
