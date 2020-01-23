<template>
  <div>
    <div class="title">新建账单</div>
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
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          list-type="picture-card"
          :file-list="fileList"
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
        <el-button @click="cancel">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'add-moadl',
  // props: {
  //   dialogVisible: {
  //     type: Boolean,
  //     default: false
  //   },
  //   detailData: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         name: '',
  //         date: new Date(),
  //         money: '',
  //         memo: '',
  //         status: '2'
  //       }
  //     }
  //   }
  // },
  // computed: {
  //   isShowDialog: {
  //     get () {
  //       console.log('你俩谁先啊')
  //       return this.dialogVisible
  //     },
  //     set () {
  //       console.log('咋用的啊？')
  //       // this.$emit('cancel')
  //       this.cancel()
  //     }
  //   }
  // },
  data () {
    return {
      fileList: [
        {
          name: '',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      dialogImageUrl: '',
      elDialogVisible: false,
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
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
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
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.elDialogVisible = true
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    }
  },
  created () {
    this.ruleForm = JSON.parse(localStorage.getItem('detailData'))
  },
  activated () {
    this.ruleForm = JSON.parse(localStorage.getItem('detailData'))
  }
  // watch: {
  //   isShowDialog () {
  //     this.ruleForm = this.detailData
  //   }
  // }
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
