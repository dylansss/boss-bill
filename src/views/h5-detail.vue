<template>
  <div>
    <div class="title">{{detailData.name}}</div>
    <div class="detail">
      <el-form :model="detailData" label-width="100px" class="demo-detailData">
        <el-form-item label="姓名" prop="name">
          <el-input disabled v-model="detailData.name"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input disabled v-model="detailData.money"></el-input>
        </el-form-item>
        <el-form-item label="欠款状态">
          <el-radio-group disabled v-model="detailData.status">
            <el-radio label="0">已还清</el-radio>
            <el-radio label="1">部分还清</el-radio>
            <el-radio label="2">未还</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            disabled
            action="http://106.54.44.66:8080/watter/fq/file"
            multiple
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="elDialogVisible" width="100%">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="备注">
          <el-input disabled v-model="detailData.memo"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm">确认</el-button> -->
          <el-button @click="cancel">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-moadl',
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      elDialogVisible: false,
      detailData: {
        name: '',
        date: new Date(),
        money: '',
        memo: '',
        status: '2'
      }
    }
  },
  methods: {
    cancel () {
      // this.$emit('cancel')
      this.$router.push('home-web')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.elDialogVisible = true
    },
    handleDetailData () {
      this.fileList = []
      this.detailData = JSON.parse(localStorage.getItem('detailData'))
      let pics = this.detailData.picUrl ? this.detailData.picUrl.split(',') : []
      console.log(pics)
      pics.map(v => {
        const obj = {
          name: '',
          url: v
        }
        this.fileList.push(obj)
      })
      localStorage.removeItem('detailData')
    }
  },
  created () {
    this.handleDetailData()
  },
  activated () {
    this.handleDetailData()
    // this.detailData = JSON.parse(localStorage.getItem('detailData'))
  }
}
</script>

<style lang="less" scoped>

</style>
