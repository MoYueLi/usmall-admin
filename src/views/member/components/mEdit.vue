<template>
  <div>
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form ref="memberForm" :model="form" :rules="rules">
        <el-form-item label="手机号" label-width="80px"
                      prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" autocomplete="off" prop="nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { reqMemberInfo, reqMemberEdit } from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  props: ['info'],
  name: 'mEdit',
  data () {
    let reg = /^1[3456789]\d{9}$/
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      form: {
        nickname: '',
        phone: '',
        password: '',
        status: 1
      },
      rules: {
        phone: [{ validator: validatePass, trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'member/list'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'member/setMemberList'
    }),
    empty () {
      this.form = {
        nickname: '',
        phone: '',
        password: '',
        status: 1
      }
    },
    cancel () {
      this.info.show = false
      this.empty()
    },
    getInfo (id) {
      reqMemberInfo({ uid: id }).then(res => {
        this.form = res.data.list
        this.form.password = ''
      })
    },
    update () {
      reqMemberEdit(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
