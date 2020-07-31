<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { reqUserDelete } from '@/utils/request'
import { successAlert, warningAlert } from '@/utils/alert'

export default {
  name: 'uList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      list: 'user/list',
      size: 'user/size',
      total: 'user/total'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'user/reqUserList',
      changePage: 'user/changePage',
      reqTotal: 'user/reqUserTotal'
    }),
    cPage (p) {
      this.changePage(p)
      this.reqList()
    },
    del (id) {
      reqUserDelete({ uid: id }).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.reqList()
          this.reqTotal()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    update (id) {
      this.$emit('edit', id)
    }
  },
  mounted () {
    if (!this.list.length) {
      this.reqTotal()
      this.reqList()
    }
  }
}
</script>

<style scoped>

</style>
