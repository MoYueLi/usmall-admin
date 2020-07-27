<template>
  <div class="uploadBox">
    <el-dialog width="60%" :title="info.title" @close="empty" :visible.sync="info.show" @opened="creatEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstId()">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="item in cateArr" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off">
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
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="item in specsArr" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import { mapActions, mapGetters } from 'vuex'
import E from 'wangeditor'
import { reqGoodsAdd, reqGoodsDetail, reqGoodsEdit } from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  props: ['info'],
  name: 'gAdd',
  data () {
    return {
      form: {
        first_cateid: '',
        second_cateid: '',
        goodsname: '',
        price: '',
        market_price: '',
        img: null,
        description: '',
        specsid: '',
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      imageUrl: '',
      // 商品二级分类
      cateArr: [],
      // 规格属性二级分类
      specsArr: [],
      // 富文本编辑器
      editor: null
    }
  },
  computed: {
    ...mapGetters({
      cateList: 'cate/list',
      specsList: 'specs/list'
    })
  },
  methods: {
    ...mapActions({
      reqCateList: 'cate/setCateList',
      reqSpecsList: 'specs/reqSpecsList',
      reqGoodsList: 'goods/setGoodsList',
      reqGoodsTotal: 'goods/setGoodsTotal'
    }),
    empty () {
      this.form = {
        first_cateid: '',
        second_cateid: '',
        goodsname: '',
        price: '',
        market_price: '',
        img: null,
        description: '',
        specsid: '',
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      }
      this.imageUrl = ''
      // 商品二级分类
      this.cateArr = []
      // 规格属性二级分类
      this.specsArr = []
      // 富文本编辑器
      this.editor.txt.html('')
    },
    cancel () {
      this.info.show = false
      if (this.info.isAdd) {
        this.empty()
      }
    },
    changeImg (e) {
      let file = e.raw
      this.form.img = file
      this.imageUrl = URL.createObjectURL(file)
    },
    add () {
      this.form.description = this.editor.txt.html()
      this.form.specsattr = JSON.stringify(this.form.specsattr)
      reqGoodsAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqGoodsList()
          this.reqGoodsTotal()
        }
      })
    },
    getDetail (id) {
      reqGoodsDetail({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.list
          this.form.id = id
          this.imageUrl = this.$imgpre + this.form.img
          this.changeFirstId(true)
          this.changeSpecsId(true)
          this.form.specsattr = JSON.parse(this.form.specsattr)
        }
      })
    },
    update () {
      this.form.description = this.editor.txt.html()
      this.form.specsattr = JSON.stringify(this.form.specsattr)
      reqGoodsEdit(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqGoodsList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    changeFirstId (bool) {
      let index = this.cateList.findIndex(
        (item) => item.id === this.form.first_cateid
      )
      this.cateArr = this.cateList[index].children
      // 如果不传值就置空
      if (!bool) {
        this.form.second_cateid = ''
      }
    },
    changeSpecsId (bool) {
      let index = this.specsList.findIndex(
        (item) => item.id === this.form.specsid
      )
      this.specsArr = this.specsList[index].attrs
      // 如果不传值就置空
      if (!bool) {
        this.form.specsattr = []
      }
    },
    creatEditor () {
      this.editor = new E('#desc')
      this.editor.create()
      this.editor.txt.html(this.form.description)
    }
  },
  mounted () {
    if (!this.cateList.length) {
      this.reqCateList()
    }
    this.reqSpecsList(true)
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
