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
        <div class="img-list">
          <div class="img-item" v-for="(o, i) in fileList" :key="i">
            <img :src="o" alt="" @click="viewDetail(o)" srcset="">
            <i class="el-icon-circle-close" @click="removeImg(i)"></i>
          </div>
        </div>
        <input class="ele-hidden" v-show="false" type="file"  accept="image/*" size="30" ref="getPhoto" @change="uploadAvatar">
        <el-button type="primary" @click="uploadBtn">点击选择图片</el-button>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.memo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      width="100%">
      <img :src="dialogImgUrl" alt="" style="display: block;width: 100%;">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'add-moadl',
  data () {
    return {
      // imgUrl: '',
      dialogImgUrl: '',
      dialogVisible: false,
      imgList: [],
      fileList: [],
      // dialogImageUrl: '',
      // elDialogVisible: false,
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
              this.ruleForm = {
                picUrl: '',
                name: '',
                money: '',
                memo: '',
                status: '2',
                date: new Date().format('yyyy-MM-dd')
              }
              this.fileList = []
              this.imgList = []
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
    uploadBtn () {
      this.$refs.getPhoto.click()
    },
    uploadAvatar (node) {
      let $file = node.target.files[0]
      this.uploadImg($file)
    },
    uploadImg (file) {
      let self = this
      let formData = new FormData()
      formData.append('file', file)
      api.uploadImg(formData).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.imgList.push({
            url: res.data
          })
          let reader = new FileReader()
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file)
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result
            console.log(result)
            self.fileList.push(result)
          }
        }
      })
    },
    viewDetail (url) {
      this.dialogImgUrl = url
      this.dialogVisible = true
    },
    removeImg (i) {
      this.imgList.splice(i, 1)
      this.fileList.splice(i, 1)
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
.img-list{
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  .img-item{
    position: relative;
    margin-right: 10px;
  }
  i{
    font-size: 20px;
    font-weight: bolder;
    position: absolute;
    top: -5px;
    right: -5px;
    color: red;
  }
  img{
    display: block;
    width: 50px;
  }
}
</style>
