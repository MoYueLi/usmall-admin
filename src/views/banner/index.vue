<template>
  <div>
    <!--测试github添加-->
    <!--    banner-->
    <el-button class="elBtn" @click="add" type="primary">添加</el-button>
    <!--添加弹窗-->
    <b-add ref="add" :info="info"/>
    <!--数据列表-->
    <b-list @edit="edit"/>
  </div>
</template>

<script>
import BAdd from './components/bAdd'
import BList from './components/bList'

export default {
  name: 'Banner',
  components: { BList, BAdd },
  data () {
    return {
      info: {
        show: false,
        title: '轮播图添加',
        isAdd: true
      }
    }
  },
  methods: {
    add () {
      this.info.show = true
      this.info.title = '轮播图添加'
      this.info.isAdd = true
    },
    edit (id) {
      this.info.show = true
      this.info.title = '轮播图编辑'
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
