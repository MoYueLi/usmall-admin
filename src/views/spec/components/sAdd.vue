<template>
  <div class="add">
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form ref="specForm" :model="form" :rules="rules">
        <el-form-item label="规格名称" label-width="80px" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <div v-for="(item, index) in attrs" :key="item.key">
          <el-form-item label="规格属性" label-width="80px">
            <el-input v-model="item.name" autocomplete="off"></el-input>
            <el-button v-if="index === 0" type="primary" @click="addSpecsAttr(index)">新增规格属性</el-button>
            <el-button v-else type="danger" @click="del(index)">删除</el-button>
          </el-form-item>
        </div>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                     :inactive-value="2">状态
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { reqSpecsAdd, reqSpecsDetail, reqSpecsEdit } from '../../../utils/request'
import { successAlert, warningAlert } from '@/utils/alert'

export default {
  props: ['info'],
  name: 'sAdd',
  data () {
    return {
      form: {
        specsname: '',
        attrs: '',
        status: 1
      },
      attrs: [{
        name: '',
        key: 0
      }],
      rules: {
        specsname: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqList: 'specs/reqSpecsList',
      reqSpecsTotal: 'specs/reqSpecsTotal'
    }),
    empty () {
      this.form = {
        specsname: '',
        attrs: '',
        status: 1
      }
      this.attrs = [{
        name: '',
        key: 0
      }]
    },
    cancel () {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    add () {
      if (this.attrs.some(item => item.name === '')) {
        warningAlert('属性值不能为空')
        return
      }
      let formAttrs = []
      for (let i in this.attrs) {
        if (this.attrs[i]) {
          formAttrs.push(this.attrs[i].name)
        }
      }
      this.form.attrs = JSON.stringify(formAttrs)
      this.$refs.specForm.validate((valid) => {
        if (valid) {
          reqSpecsAdd(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              this.empty()
              this.cancel()
              this.reqList()
              this.reqSpecsTotal()
            } else {
              warningAlert(res.data.msg)
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    },
    update () {
      if (this.attrs.some(item => item.name === '')) {
        warningAlert('属性值不能为空')
        return
      }
      let formAttrs = []
      for (let i in this.attrs) {
        if (this.attrs[i]) {
          formAttrs.push(this.attrs[i].name)
        }
      }
      this.form.attrs = JSON.stringify(formAttrs)
      this.$refs.specForm.validate((valid) => {
        if (valid) {
          reqSpecsEdit(this.form).then(res => {
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
    addSpecsAttr (index) {
      this.attrs.push({ name: '', key: Date.now() })
    },
    del (index) {
      this.attrs.splice(index, 1)
    },
    getDetail (id) {
      reqSpecsDetail({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.list[0]
          // this.form.attrs = ''
          console.log(res.data.list[0])
          let arr = JSON.parse(res.data.list[0].attrs)
          let curAttrs = []
          for (let i in arr) {
            let param = {
              name: arr[i],
              key: i
            }
            curAttrs.push(param)
          }
          this.attrs = curAttrs
          this.form.attrs = ''
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">
  .add >>> .el-form-item__content {
    display: flex !important;
  }

  .add >>> .el-button {
    width: auto;
  }

  .add >>> .el-input {
    flex 1
  }
</style>
