<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="100">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { reqSecKillDelete } from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  name: 'skList',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      list: 'seckill/list'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'seckill/setSecKillList'
    }),
    del (id) {
      reqSecKillDelete({ id: id }).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.reqList()
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
      this.reqList()
    }
  }
}
</script>

<style scoped>

</style>
