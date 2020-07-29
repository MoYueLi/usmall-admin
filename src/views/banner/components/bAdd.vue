<template>
  <div class="uploadBox">
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form ref="bannerForm" :model="form" :rules="rules">
        <el-form-item label="标题" label-width="80px" prop="title">
          <el-input v-model="form.title" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            action="#" class="avatar-uploader"
            :show-file-list="false"
            :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button @click="add" type="primary" v-if="info.isAdd">确 定</el-button>
        <el-button @click="update" type="primary" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from '../../../utils/alert'
import { reqBannerAdd, reqBannerDetail, reqBannerEdit } from '../../../utils/request'
import { mapActions } from 'vuex'

export default {
  props: ['info'],
  name: 'bAdd',
  data () {
    return {
      form: {
        title: '',
        img: null,
        status: 1
      },
      imageUrl: '',
      // 表单验证
      rules: {
        title: [{ required: true, message: '请输入轮播名称', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      reqList: 'banner/setBannerList'
    }),
    empty () {
      this.form = {
        title: '',
        img: null,
        status: 1
      }
      this.imageUrl = ''
    },
    cancel () {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    changeImg (e) {
      if (e.size > (1024 * 1024 * 2)) {
        warningAlert('图片大小不能超过2M')
        return
      }
      let extname = e.name.slice(e.name.lastIndexOf('.'))
      let extarr = ['.jpg', '.png', '.jpeg', '.gif']
      // let reg = /.jpg$|.jpeg$|.gif$/i
      if (!extarr.some(item => item === extname)) {
        warningAlert('您上传的不是图片')
        return
      }

      let file = e.raw
      this.imageUrl = URL.createObjectURL(file)
      this.form.img = file
    },
    add () {
      this.$refs.bannerForm.validate((valid) => {
        if (valid) {
          reqBannerAdd(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              this.empty()
              this.cancel()
              this.reqList()
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    },
    update () {
      this.$refs.bannerForm.validate((valid) => {
        if (valid) {
          reqBannerEdit(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              this.empty()
              this.cancel()
              this.reqList()
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    },
    getDetail (id) {
      reqBannerDetail({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.list
          this.form.id = id
          this.imageUrl = this.$imgpre + res.data.list.img
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">
  .uploadBox >>> .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .uploadBox >>> .el-upload:hover {
    border-color: #409EFF !important;
  }

  .el-icon-plus {
    line-height 178px
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
