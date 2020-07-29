<template>
  <div>
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form ref="roleForm" :model="form" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree ref="tree" :data="list" show-checkbox node-key="id"
                   :default-checked-keys="defaultKey"
                   :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                     :inactive-value="2">状态
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd, reqRoleInfo, reqRoleEdit } from '@/utils/request'
import { successAlert, warningAlert } from '@/utils/alert'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['info'],
  name: 'rAdd',
  data () {
    return {
      form: {
        rolename: '',
        status: 1,
        menus: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultKey: [],
      rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'menu/list'
    })
  },
  methods: {
    ...mapActions({
      reqRoleList: 'role/reqRoleList'
    }),
    empty () {
      this.form = {
        rolename: '',
        status: 1,
        menus: ''
      }
      this.$refs.tree.setCheckedKeys([])
    },
    canel () {
      this.info.show = false
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    add () {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      if (!this.form.menus) {
        warningAlert('权限不能为空')
        return
      }
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          reqRoleAdd(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              this.empty()
              this.canel()
              this.reqRoleList()
            } else {
              warningAlert(res.data.msg)
            }
          })
        } else {
          warningAlert('不能有选项为空！')
        }
      })
    },
    getDetail (id) {
      reqRoleInfo({ id: id }).then(res => {
        this.form = res.data.list
        this.form.id = id
        this.defaultKey = JSON.parse(res.data.list.menus)
      })
    },
    update () {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      if (!this.form.menus) {
        warningAlert('权限不能为空')
        return
      }
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          reqRoleEdit(this.form).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg)
              this.empty()
              this.canel()
              this.reqRoleList()
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
  }
}
</script>

<style scoped>

</style>
