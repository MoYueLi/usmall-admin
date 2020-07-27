<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="100">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100">
      </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgpre+scope.row.img" alt/>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
import { reqGoodsDelete } from '../../../utils/request'
import { successAlert, warningAlert } from '../../../utils/alert'

export default {
  name: 'gList',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      list: 'goods/list',
      total: 'goods/total',
      size: 'goods/size'
    })
  },
  methods: {
    ...mapActions({
      changePage: 'goods/setPage',
      reqGoodsList: 'goods/setGoodsList',
      reqGoodsTotal: 'goods/setGoodsTotal'
    }),
    update (id) {
      this.$emit('edit', id)
    },
    del (id) {
      reqGoodsDelete({ id: id }).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.reqGoodsTotal()
          this.reqGoodsList()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    cPage (p) {
      this.changePage(p)
      this.reqGoodsList()
    }
  },
  mounted () {
    if (!this.list.length) {
      this.reqGoodsList()
      this.reqGoodsTotal()
    }
  }
}
</script>

<style scoped>
  img {
    width: 100px;
  }
</style>
