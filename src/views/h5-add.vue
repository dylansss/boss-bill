<template>
  <div>
    <div class="title">新建账单</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="elDialogVisible" width="100%">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.memo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'add-moadl',
  data () {
    return {
      imgList: [],
      dialogImageUrl: '',
      elDialogVisible: false,
      // isShowDialog: this.dialogVisible,
      ruleForm: {
        picUrl: '',
        name: '',
        money: '',
        memo: '',
        status: '2',
        date: new Date().format('yyyy-MM-dd')
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.picUrl = this.imgList.map(v => {
            return v.url
          }).join(',')
          api.save(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.$router.push('home-web')
            }
          })
        } else {
          return false
        }
      })
    },
    cancel () {
      // this.$emit('cancel')
      this.$router.push('home-web')
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
    isShowDialog () {
      this.ruleForm = this.detailData
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 15px;
  text-indent: 1em;
}
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
