<template>
  <div>
    <el-dialog :title="info.title" @close="empty" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选上级">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
          <el-radio v-model="form.type" :label="1">目录</el-radio>
        </el-form-item>
        <el-form-item v-if="form.type===1" label="菜单图标" label-width="80px">
          <el-select v-model="form.icon">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" label-width="80px">
          <el-select v-model="form.url">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
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
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from '@/utils/request'
import { successAlert, warningAlert } from '@/utils/alert'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['info'],
  name: 'vAdd',
  computed: {
    ...mapGetters({
      list: 'menu/list'
    })
  },
  data () {
    return {
      // 表单数据
      form: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
      // 地址集合
      urls: [
        '/home',
        '/menu',
        '/role',
        '/manage',
        '/cate',
        '/spec',
        '/goods',
        '/banner',
        '/member',
        '/seckill'
      ],
      // 图标集合
      icons: [
        'el-icon-setting',
        'el-icon-s-help',
        'el-icon-s-operation',
        'el-icon-s-grid',
        'el-icon-s-goods'
      ]
    }
  },
  methods: {
    ...mapActions({
      // 获取菜单数据
      reqList: 'menu/reqMenuList'
    }),
    // 清空数据
    empty () {
      this.form = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      }
    },
    // 关闭窗口
    cancel () {
      this.info.show = false
      // 不是添加的时候清空数据
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    // 添加数据
    add () {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取单条数据(用来修改数据时使用)
    getDetail (id) {
      reqMenuDetail({ id: id }).then(res => {
        this.form = res.data.list
        this.form.id = id
      })
    },
    // 修改数据发包
    update () {
      reqMenuUpdate(this.form).then(res => {
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
