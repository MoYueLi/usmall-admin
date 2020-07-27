<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="100">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="100">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { reqSpecsDelete } from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  name: 'sList',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      list: 'specs/list',
      size: 'specs/size',
      total: 'specs/total'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'specs/reqSpecsList',
      changePage: 'specs/reqCurPage',
      reqTotal: 'specs/reqSpecsTotal'
    }),
    del (id) {
      reqSpecsDelete({ id: id }).then(res => {
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
    },
    cPage (p) {
      this.changePage(p)
      this.reqList()
    }
  },
  mounted () {
    if (this.list.length === 0) {
      this.reqTotal()
      this.reqList()
    }
  }
}
</script>

<style scoped>

</style>
