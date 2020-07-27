<template>
  <div>
    <el-button class="elBtn" @click="add" type="primary">添加</el-button>
    <!--添加弹窗-->
    <g-add ref="add" :info="info"/>
    <!--数据列表-->
    <g-list @edit="edit"/>
  </div>
</template>

<script>
import GAdd from './components/gAdd'
import GList from './components/gList'

export default {
  name: 'Goods',
  components: { GList, GAdd },
  data () {
    return {
      info: {
        show: false,
        title: '商品添加',
        isAdd: true
      }
    }
  },
  methods: {
    add () {
      this.info.show = true
      this.info.title = '商品添加'
      this.info.isAdd = true
    },
    edit (id) {
      this.info.show = true
      this.info.title = '商品修改'
      this.info.isAdd = false
      this.$refs.add.getDetail(id)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
