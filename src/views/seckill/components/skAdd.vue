<template>
  <div>
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="activityTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstId()">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="changeGood()">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="item in cateArr" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" @change="changeGood()">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="item in goodsList" :key="item.id" :label="item.goodsname" :value="item.id">
            </el-option>
          </el-select>
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
import { reqSecKillAdd, reqSecKillDetail, reqSecKillEdit } from '../../../utils/request'
import { mapActions, mapGetters } from 'vuex'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  props: ['info'],
  name: 'skAdd',
  data () {
    return {
      form: {
        title: '',
        begintime: '',
        endtime: '',
        first_cateid: '',
        second_cateid: '',
        goodsid: '',
        status: 1
      },
      // 二级分类
      cateArr: [],
      // 活动时间
      activityTime: []
    }
  },
  computed: {
    ...mapGetters({
      cateList: 'cate/list',
      goodsList: 'goods/list'
    })
  },
  methods: {
    ...mapActions({
      reqCateList: 'cate/setCateList',
      reqGoodsList: 'goods/setGoodsList',
      reqSecKillList: 'seckill/setSecKillList'
    }),
    empty () {
      this.form = {
        title: '',
        begintime: '',
        endtime: '',
        first_cateid: '',
        second_cateid: '',
        goodsid: '',
        status: 1
      }
      this.cateArr = []
      this.activityTime = []
    },
    changeFirstId (bool) {
      let index = this.cateList.findIndex(
        (item) => item.id === this.form.first_cateid
      )
      this.cateArr = this.cateList[index].children
      if (!bool) {
        this.form.second_cateid = ''
      }
    },
    changeGood (bool) {
      this.reqGoodsList({ fid: this.form.first_cateid, sid: this.form.second_cateid })
    },
    cancel () {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    add () {
      // 设置开始结束时间
      this.form.begintime = this.activityTime[0].getTime()
      this.form.endtime = this.activityTime[1].getTime()
      // console.log(this.form)
      reqSecKillAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqSecKillList()
        }
      })
    },
    update () {
      // 设置开始结束时间
      this.form.begintime = this.activityTime[0].getTime()
      this.form.endtime = this.activityTime[1].getTime()
      reqSecKillEdit(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqSecKillList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    getDetail (id) {
      reqSecKillDetail({ id: id }).then(res => {
        this.form = res.data.list
        this.changeFirstId(true)
        this.changeGood(true)
        this.activityTime = [new Date(Number(this.form.begintime)), new Date(Number(this.form.endtime))]
        console.log(this.activityTime)
        this.form.id = id
      })
    }
  },
  mounted () {
    if (!this.cateList.length) {
      this.reqCateList()
    }
  }
}
</script>

<style scoped>

</style>
