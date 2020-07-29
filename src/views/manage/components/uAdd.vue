<template>
  <div>
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form ref="manageForm" :model="form" :rules="rules">
        <el-form-item label="所属角色" label-width="80px" prop="roleid">
          <el-select v-model="form.roleid">
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
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
import { reqUserAdd, reqUserUpdate, reqUserDetail } from '@/utils/request'
import { successAlert, warningAlert } from '@/utils/alert'

export default {
  props: ['info'],
  name: 'uAdd',
  data () {
    return {
      form: {
        roleid: '',
        username: '',
        password: '',
        status: 1
      },
      rules: {
        roleid: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'role/list'
    })
  },
  methods: {
    ...mapActions({
      reqRoleList: 'role/reqRoleList',
      reqUserList: 'user/reqUserList',
      reqUserTotal: 'user/reqUserTotal'
    }),
    empty () {
      this.form = {
        roleid: '',
        username: '',
        password: '',
        status: 1
      }
    },
    cancel () {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    add () {
      this.$refs['manageForm'].validate((valid) => {
        if (valid) {
          reqUserAdd(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              // 清空
              this.empty()
              // 弹框消失
              this.cancel()
              // 获取管理员数据
              this.reqUserList()
              // 获取管理员数据总数
              this.reqUserTotal()
            } else {
              warningAlert(res.data.msg)
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    },
    getDetail (uid) {
      reqUserDetail({ uid: uid }).then(res => {
        this.form = res.data.list
        this.form.password = ''
      })
    },
    update () {
      this.$refs.manageForm.validate((valid) => {
        if (valid) {
          reqUserUpdate(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              // 清空
              this.empty()
              // 弹框消失
              this.cancel()
              // 获取管理员数据
              this.reqUserList()
            } else {
              warningAlert(res.data.msg)
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    }
  },
  mounted () {
    if (this.list.length === 0) {
      this.reqRoleList()
    }
  }
}
</script>

<style scoped>

</style>
